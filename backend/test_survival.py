import unittest
from survival import survivalModel

class TestSurvival(unittest.TestCase):

    def test_survival_rate_for_low_nodes_and_young_age(self):
        age = 35
        nodes = 2
        expected_output = 'Survival rate is approximately 90%'
        self.assertEqual(survivalModel(age, nodes), expected_output)

    def test_survival_rate_for_low_nodes_and_old_age(self):
        age = 70
        nodes = 3
        expected_output = 'Survival rate is approximately 74%'
        self.assertEqual(survivalModel(age, nodes), expected_output)

    def test_survival_rate_for_medium_nodes_and_young_age(self):
        age = 40
        nodes = 5
        expected_output = 'Survival rate is approximately 75%'
        self.assertEqual(survivalModel(age, nodes), expected_output)

    def test_survival_rate_for_medium_nodes_and_old_age(self):
        age = 65
        nodes = 6
        expected_output = 'Survival rate approximately 47%'
        self.assertEqual(survivalModel(age, nodes), expected_output)

    def test_survival_rate_for_high_nodes_and_young_age(self):
        age = 45
        nodes = 8
        expected_output = 'Survival rate is approximately 54%'
        self.assertEqual(survivalModel(age, nodes), expected_output)

    def test_survival_rate_for_high_nodes_and_old_age(self):
        age = 75
        nodes = 10
        expected_output = 'Survival rate is approximately 40%'
        self.assertEqual(survivalModel(age, nodes), expected_output)

if __name__ == '__main__':
    unittest.main()
