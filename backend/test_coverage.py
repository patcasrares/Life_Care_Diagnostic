import unittest
import coverage

# Create a coverage object
cov = coverage.Coverage()

# Start measuring code coverage
cov.start()

# Run the tests
unittest.main(module='test_face', exit=False)

unittest.main(module='test_tumoare', exit=False)

unittest.main(module='test_skin', exit=False)

unittest.main(module='test_sound', exit=False)

unittest.main(module='test_survival', exit=False)

# Stop measuring code coverage
cov.stop()

cov.html_report(directory='coverage_report')

# Generate the coverage report
cov.report()
