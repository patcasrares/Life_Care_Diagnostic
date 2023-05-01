import unittest
from unittest.mock import patch, MagicMock

from sound import read_sound, diagnostic_sound

class TestSoundAnalysis(unittest.TestCase):
    
    
    def test_read_sound(self):
        # Test reading a WAV file and checking the shape of the output
        file_path = 'test_sound.wav'
        mel_spec = read_sound(file_path)
        self.assertEqual(mel_spec.shape, (128, 95))
    
    def test_diagnostic_sound(self):
        # Test making a diagnosis for a given sound file and checking the output
        model_sound = MagicMock()
        diagnosis = diagnostic_sound('test_sound.wav', model_sound)
        self.assertEqual(diagnosis.shape, (1, 2))
        # Ensure the output is a probability distribution
        self.assertAlmostEqual(diagnosis.sum(), 1.0, places=4)
    
if __name__ == '__main__':
    unittest.main()
