import matplotlib.pyplot as plt

# Define data
errors = 38
complexity_warnings = 12
other_warnings = 2

# Create chart
fig, ax = plt.subplots(figsize=(6, 6))

# Set colors
colors = ['#ff9999','#66b3ff','#99ff99']

# Set labels and values
labels = ['Errors','Complexity Warnings','Other Warnings']
values = [errors, complexity_warnings, other_warnings]

# Create chart
ax.pie(values, labels=labels, colors=colors, autopct='%1.1f%%', startangle=90)

# Set title
ax.set_title('ESLint Results')

# Show chart
plt.show()
