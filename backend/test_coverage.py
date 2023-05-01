import unittest
import coverage

# Create a coverage object
cov = coverage.Coverage()

# Start measuring code coverage
cov.start()

# Run the tests
unittest.main(module='test_face', exit=False)

# Stop measuring code coverage
cov.stop()

# Generate the coverage report
cov.report()
