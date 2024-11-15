import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from sklearn.feature_selection import VarianceThreshold
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import os

# 1. Load and prepare data
df = pd.read_csv('../dataset/environmental_dataset.csv')  # replace with your actual file path
numerical_cols = df.select_dtypes(include=['float64', 'int64']).columns
df[numerical_cols] = df[numerical_cols].fillna(df[numerical_cols].mean())

# 2. Feature selection based on correlation
def select_features(df, numerical_cols, correlation_threshold=0.8):
    corr_matrix = df[numerical_cols].corr()
    
    # Plot correlation heatmap
    plt.figure(figsize=(12, 8))
    sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0)
    plt.title('Feature Correlation Matrix')
    plt.tight_layout()
    plt.show()
    
    # Remove highly correlated features
    corr_features = set()
    for i in range(len(corr_matrix.columns)):
        for j in range(i):
            if abs(corr_matrix.iloc[i, j]) > correlation_threshold:
                colname = corr_matrix.columns[i]
                corr_features.add(colname)
    
    return [col for col in numerical_cols if col not in corr_features]

# Select features
selected_features = select_features(df, numerical_cols)

# 3. Remove low variance features
selector = VarianceThreshold(threshold=0.01)
X = df[selected_features]
selector.fit(X)
final_features = X.columns[selector.get_support()].tolist()

# 4. Standardize the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df[final_features])

# 5. Apply PCA for dimensionality reduction
pca = PCA(n_components=0.95)
X_pca = pca.fit_transform(X_scaled)
print("Number of PCA components:", X_pca.shape[1])

# 6. Perform clustering with 5 clusters
kmeans = KMeans(n_clusters=5, random_state=42)
clusters = kmeans.fit_predict(X_pca)

# Save models and selected features
models_dir = 'models'
if not os.path.exists(models_dir):
    os.makedirs(models_dir)

# Save scaler, PCA, and KMeans model
joblib.dump(scaler, os.path.join(models_dir, 'scaler_model.pkl'))
joblib.dump(pca, os.path.join(models_dir, 'pca_model.pkl'))
joblib.dump(kmeans, os.path.join(models_dir, 'kmeans_model.pkl'))

# Save feature list
feature_data = {
    'final_features': final_features,
    'selected_features': selected_features
}
joblib.dump(feature_data, os.path.join(models_dir, 'feature_lists.pkl'))

# 7. Add cluster labels to original dataframe
df['Cluster'] = clusters

# 8. Visualization of clusters using first two PCA components
plt.figure(figsize=(10, 8))
scatter = plt.scatter(X_pca[:, 0], X_pca[:, 1], c=clusters, cmap='viridis')
plt.xlabel('First PCA Component')
plt.ylabel('Second PCA Component')
plt.title('Clusters Visualization using PCA')
plt.colorbar(scatter)
plt.show()

# 9. Save clustered data
df.to_csv('../dataset/clustered_environmental_data.csv', index=False)

# 10. Analyze cluster characteristics
cluster_means = df.groupby('Cluster')[final_features].mean()

# Display cluster means
plt.figure(figsize=(15, 8))
cluster_means_normalized = (cluster_means - cluster_means.mean()) / cluster_means.std()
sns.heatmap(cluster_means_normalized, cmap='RdYlBu', center=0, annot=True, fmt='.2f')
plt.title('Normalized Feature Means by Cluster')
plt.ylabel('Cluster')
plt.xlabel('Features')
plt.tight_layout()
plt.show()

# Print summary statistics for each cluster
print("\nCluster Characteristics:")
print("-" * 50)
for cluster in range(len(cluster_means)):
    print(f"\nCluster {cluster} characteristics:")
    
    # Get top 3 distinguishing features (highest absolute normalized values)
    cluster_features = cluster_means_normalized.iloc[cluster].sort_values(key=abs, ascending=False)[:3]
    
    print("Main distinguishing features:")
    for feature, value in cluster_features.items():
        direction = "high" if value > 0 else "low"
        print(f"- {feature}: {direction} ({value:.2f} standard deviations from mean)")
    
    # Print cluster size
    cluster_size = (df['Cluster'] == cluster).sum()
    cluster_percentage = (cluster_size / len(df)) * 100
    print(f"Cluster size: {cluster_size} samples ({cluster_percentage:.1f}% of total)")
