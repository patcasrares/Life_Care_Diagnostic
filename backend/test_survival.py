from server import app
from hypothesis import given, strategies as st, settings
import concurrent.futures
import math

@given(users=st.lists(elements=st.fixed_dictionaries({
    'age': st.floats(allow_nan=False, allow_infinity=False, min_value=0, max_value=1020),
    'nodes': st.floats(allow_nan=True, allow_infinity=False)
}), min_size=50, max_size=50))
@settings(max_examples=500)
def test_survivalChances(users):
    def run_test(user):
        with app.test_client() as c:
            age = user['age']
            nodes = user['nodes']
            
            rsp = c.get(f'/survivalChances?age={age}&nodes={nodes}')
           
            assert rsp.status_code == 200
            data = rsp.data.decode('utf-8')
            
            match_str = "Survival"
           
            nodes = str(nodes)
            try: 
                nodes = float(nodes)
            except ValueError:
                match_str = "Invalid"
            nodes = str(nodes)
            if "e+" in nodes:
                match_str = "Invalid"
            print(nodes)
            print(match_str)
            print(data)
            '''if data.startsWith("Invalid"):
                print("The rsp", data.startswith("Survival"), nodes, match_str, float(nodes))'''
            if data != "None":
                assert data.startswith(match_str) == True

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(run_test, user) for user in users]
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
    print("Test complete")

print("aa")