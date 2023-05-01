import unittest
from unittest.mock import patch, MagicMock
from PIL import Image
import numpy as np
from face import read_face, diagnostic_face

class TestFace(unittest.TestCase):
    
    def test_read_face(self):
        img = Image.new('RGB', (30, 40), color='red')
        img.save('test.jpg')
        numpydata = read_face('test.jpg')
        print(numpydata.shape)
        print(numpydata[:, :, 0, 0])
        self.assertEqual(numpydata.shape, (40, 30, 3, 3))
        self.assertTrue((numpydata[:, :, 0, 0] == 254).all())
        self.assertTrue((numpydata[:, :, 1, 1:] == 0).all())
        self.assertTrue((numpydata[:, :, 0, 0] == 254).all())


        
    @patch('numpy.asarray')
    def test_diagnostic_face(self, mock_np_asarray):
        mock_np_asarray.return_value = np.ones((40, 30, 3))
        model_face = MagicMock()
        model_face.predict.return_value = np.array([[0.1, 0.9]])
        y_prob = diagnostic_face('test.jpg', model_face)
        self.assertEqual(y_prob.shape, (1, 2))
        self.assertAlmostEqual(y_prob[0, 0], 0.1)
        self.assertAlmostEqual(y_prob[0, 1], 0.9)
        mock_np_asarray.assert_called_once()
        model_face.predict.assert_called_once()

if __name__ == '__main__':
    unittest.main()