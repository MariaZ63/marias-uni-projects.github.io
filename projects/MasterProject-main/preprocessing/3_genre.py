import requests
from bs4 import BeautifulSoup
import csv

def get_goodreads_genre(goodreads_id):
    # URL for the Goodreads book page
    book_url = f"https://www.goodreads.com/book/show/{goodreads_id}"
    
    # Headers to make the request look like a browser request
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',  # Do Not Track
    }
    
    # Make the request to Goodreads
    response = requests.get(book_url, headers=headers)
    
    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find the first genre element
        genre_element = soup.find('a', class_='Button Button--tag Button--medium')
        
        if genre_element:
            # Extract the text of the first genre element
            genre = genre_element.find('span', class_='Button__labelItem').text
            print(f"Goodreads ID {goodreads_id}: {genre}")
            return genre
        else:
            return None
    else:
        print(f"Error fetching data for Goodreads ID {goodreads_id}: {response.status_code}")
        return None

def update_csv_with_genres(input_csv, output_csv):
    with open(input_csv, mode='r', newline='', encoding='utf-8') as infile:
        reader = csv.DictReader(infile)
        
        with open(output_csv, mode='w', newline='', encoding='utf-8') as outfile:
            fieldnames = reader.fieldnames + ['Genre']  # Add the new 'Genre' column
            writer = csv.DictWriter(outfile, fieldnames=fieldnames)
            
            writer.writeheader()
            
            for row in reader:
                goodreads_id = row['Goodreads Id']
                
                if goodreads_id:
                    genre = get_goodreads_genre(goodreads_id)
                    if genre:
                        row['Genre'] = genre
                    else:
                        row['Genre'] = 'N/A'
                else:
                    row['Genre'] = 'N/A'
                
                writer.writerow(row)

# Example usage
input_csv = 'JA_enrichedData.csv'  # Replace with your input CSV file name
output_csv = 'JA_genreData.csv'  # Replace with your desired output CSV file name

update_csv_with_genres(input_csv, output_csv)
