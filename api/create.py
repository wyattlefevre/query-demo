import sqlite3

# Function to create the database and tables if they don't exist
def create_database():
    try:
        # Connect to the database
        conn = sqlite3.connect('database.sqlite')
        cursor = conn.cursor()

        # Create Posts table if not exists
        cursor.execute('''CREATE TABLE IF NOT EXISTS Posts (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            title VARCHAR(255)
                          );''')

        # Create Comments table if not exists
        cursor.execute('''CREATE TABLE IF NOT EXISTS Comments (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            comment VARCHAR(255),
                            postId INTEGER REFERENCES Posts(id)
                          );''')

        # Commit changes and close connection
        conn.commit()
        conn.close()
        print("Database and tables created successfully!")

    except sqlite3.Error as e:
        print("Error:", e)

if __name__ == "__main__":
    create_database()
