import unittest
from unittest.mock import patch, MagicMock

import numpy as np

from sound import read_sound, diagnostic_sound

class TestSoundAnalysis(unittest.TestCase):
    
    
    def test_read_sound(self):
        # Test reading a WAV file and checking the shape of the output
        file_path = 'test_sound.wav'
        mel_spec = read_sound(file_path)
        print(mel_spec.shape)
        self.assertEqual(mel_spec.shape, (128, 216))
    
    def test_diagnostic_sound(self):
        # Test making a diagnosis for a given sound file and checking the output
        model = MagicMock()
        model.predict.return_value = np.array([[0.1, 0.9]])

        diagnosis = diagnostic_sound('test_sound.wav', model)
        print(diagnosis)
        self.assertEqual(diagnosis.shape, (1, 2))
        # Ensure the output is a probability distribution
        self.assertAlmostEqual(diagnosis.sum(), 1.0, places=4)
    
if __name__ == '__main__':
    unittest.main()
