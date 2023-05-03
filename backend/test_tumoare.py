from server import app
from hypothesis import given, strategies as st, settings
import concurrent.futures
from PIL import Image
from io import BytesIO
import os
import requests
import random
import pytest

@given(users=st.lists(elements=st.fixed_dictionaries({
    'color-r': st.integers(min_value=0, max_value=255),
    'color-g': st.integers(min_value=0, max_value=255),
    'color-b': st.integers(min_value=0, max_value=255),
    'sz': st.integers(min_value=50, max_value=255),
}), min_size=2, max_size=2))
@settings(max_examples=200, deadline=500)
@pytest.mark.timeout(1000)
def test_survival_tumor(users):
    def run_test(user):
        with app.test_client() as c:
            image = Image.new('RGB', (256, user["sz"]), color=(user["color-r"], user["color-g"], user["color-b"]))

            # Save the image to a bytes IO object as JPEG
            file_bytes_io = BytesIO()
            image.save(file_bytes_io, format='JPEG')
            file_bytes = BytesIO(file_bytes_io.getvalue())
            response = c.post('/breastCancer', data={
                'image': (file_bytes, 'test_file.jpg')
            }, content_type='multipart/form-data')
            if response.status_code != 200:
                assert response.status_code == 500
            else:
                data = response.data.decode('utf-8')
                assert data.startswith("Invalid") == True
                

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(run_test, user) for user in users]
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
    print("Test complete")
