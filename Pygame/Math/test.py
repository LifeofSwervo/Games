import numpy as np
import matplotlib.pyplot as plt
import scipy.stats as stats

# Mean and standard deviation
mu = 71000
sigma = 1140

# Define the range for the standard normal distribution
z = np.linspace(-4, 4, 1000)
pdf = stats.norm.pdf(z)

# Calculate z-score
z_val = (69000 - mu) / sigma

# Plot the standard normal distribution
plt.plot(z, pdf, label='Standard Normal Distribution')

# Fill the area for z > -1.75
z_fill = np.linspace(z_val, 4, 1000)
plt.fill_between(z_fill, stats.norm.pdf(z_fill), color='green', alpha=0.5, label=f'P(z > {z_val:.2f})')

# Add labels and legend
plt.xlabel('Z')
plt.ylabel('Probability Density')
plt.title('Standard Normal Distribution')
plt.legend()

# Show the plot
plt.show()