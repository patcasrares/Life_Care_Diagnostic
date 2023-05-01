import matplotlib.pyplot as plt

# Results from radon cc command
results = {
    'backend/sound.py': {'diagnostic_sound': 3, 'read_sound': 1},
    'backend/server.py': {'sound': 2, 'survivalChances': 1, 'breastCancer': 1, 'skin': 1, 'face': 1},
    'backend/survival.py': {'survivalModel': 7},
    'backend/tumoare.py': {'read_tumoare': 1, 'diagnostic_tumoare': 1},
    'backend/skin.py': {'read_skin': 1, 'diagnostic_skin': 1},
    'backend/face.py': {'diagnostic_face': 3, 'read_face': 1}
}

# Calculate average CC value
total_complexity = sum(sum(results[file].values()) for file in results)
average_complexity = total_complexity / len(results) if len(results) > 0 else 0

# Create chart
fig, ax = plt.subplots()
files = list(results.keys())
cc_values = [sum(results[file].values()) for file in files]
ax.barh(files, cc_values)

# Customize chart
ax.set_xlabel('Cyclomatic Complexity')
ax.set_ylabel('File')
ax.set_title('Cyclomatic Complexity by File')
ax.axvline(average_complexity, color='gray', linestyle='--')
ax.text(average_complexity + 0.5, ax.get_ylim()[1] * 0.95, f'Average CC: {average_complexity:.2f}', va='top')
plt.tight_layout()

# Display chart
plt.show()
