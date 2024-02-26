import sys
import json
import pandas as pd
import pickle

# Load the model
model_filename = 'script/travel.pkl'
with open(model_filename, 'rb') as file:
    model = pickle.load(file)

# Load your package_data dataset
package_data = pd.read_csv("script/package.csv")
package_data['Price'] = package_data['Price'].str.replace(',', '').astype(int)
package_data['Package'] = 's' + package_data['S.N'].astype(str)

def recommend(duration, price):
    all_packages = package_data.copy()
    all_packages['PredictedRating'] = model.predict(all_packages[['Duration', 'Price']])
    
    # Sort packages by predicted rating
    sorted_packages = all_packages.sort_values(by='PredictedRating', ascending=False)

    # Select the top 5 packages
    top_5_packages = sorted_packages.head(5)

    # Include necessary fields in the result
    return top_5_packages[['Destination', 'PredictedRating', 'Duration', 'Price']]

if __name__ == "__main__":
    duration = int(sys.argv[1])
    price = int(sys.argv[2])

    recommendations = recommend(duration, price)
    print(recommendations.to_json(orient='records'))
