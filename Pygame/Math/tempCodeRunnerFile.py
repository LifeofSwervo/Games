import numpy as np
import matplotlib.pyplot as plt
import scipy.stats as stats

# Define the range for the standard normal distribution
z = np.linspace(-4, 4, 1000)
pdf = stats.norm.pdf(z)

# Plot the standard normal distribution
plt.plot(z, pdf, label='Standard Normal Distribution')

# Fill the areas for z < -2.1 and z > 2.1
z1 = np.linspace(-4, -2.1, 100)
z2 = np.linspace(2.1, 4, 100)
plt.fill_between(z1, stats.norm.pdf(z1), color='red', alpha=0.5, label='P(z < -2.1)')
plt.fill_between(z2, stats.norm.pdf(z2), color='red', alpha=0.5, label='P(z > 2.1)')

# Add labels and legend
plt.xlabel('Z')
plt.ylabel('Probability Density')
plt.title('Standard Normal Distribution')
plt.legend()

# Show the plot
plt.show()