import nbformat
from nbconvert import PythonExporter

# Load the Jupyter notebook file
with open('ResNet.ipynb') as f:
    nb = nbformat.read(f, as_version=4)

# Convert the notebook to a Python file
exporter = PythonExporter()
source, meta = exporter.from_notebook_node(nb)

# Save the Python file
with open('ResNet.py', 'w') as f:
    f.write(source)
