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
    
    # Sort the packages by their predicted rating in descending order
    sorted_packages = all_packages.sort_values(by='PredictedRating', ascending=False)

    # Define tolerances for duration and price
    duration_tolerance = 2  
    price_tolerance = 5000 

    # Find packages within the specified tolerances
    close_matches = sorted_packages.loc[(abs(sorted_packages['Duration'] - duration) <= duration_tolerance) & 
                                        (abs(sorted_packages['Price'] - price) <= price_tolerance)]

    # Select the top 5 packages
    top_5_packages = close_matches.head(5)

    if not top_5_packages.empty:
        return top_5_packages[['Travel_Company','Destination', 'PredictedRating', 'Duration', 'Price']]
    else:
        return "No matching packages found."

if __name__ == "__main__":
    duration = int(sys.argv[1])
    price = int(sys.argv[2])

    recommendations = recommend(duration, price)
    if isinstance(recommendations, pd.DataFrame):
        print(recommendations.to_json(orient='records'))
    else:
        print(recommendations)
