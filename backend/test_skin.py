import unittest
from unittest.mock import patch, MagicMock
from PIL import Image
import numpy as np
from skin import read_skin, diagnostic_skin

class TestSkin(unittest.TestCase):
    
    def test_read_skin(self):
        img = Image.new('RGB', (30, 40), color='red')
        img.save('test_skin.jpg')
        numpydata = read_skin('test_skin.jpg')
        print(numpydata.shape)
        print(numpydata[:, :, 0, 0])
        self.assertEqual(numpydata.shape, (40, 30, 3, 3))
        self.assertTrue((numpydata[:, :, 0, 0] == 254).all())
        self.assertTrue((numpydata[:, :, 1, 1:] == 0).all())
        self.assertTrue((numpydata[:, :, 0, 0] == 254).all())


        
    @patch('numpy.asarray')
    def test_diagnostic_skin(self, mock_np_asarray):
        mock_np_asarray.return_value = np.ones((40, 30, 3))
        model = MagicMock()
        model.predict.return_value = np.array([[0.1, 0.9]])
        y_prob = diagnostic_skin('test_skin.jpg', model)
        print(y_prob)
        self.assertEqual(y_prob, 1)

if __name__ == '__main__':
    unittest.main()