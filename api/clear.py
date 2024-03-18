import sqlite3

# Function to clear the tables
def clear_tables():
    conn = sqlite3.connect('./database.sqlite')
    c = conn.cursor()

    # Clear Comments table
    c.execute("DELETE FROM Comments;")
    
    # Clear Posts table
    c.execute("DELETE FROM Posts;")

    conn.commit()
    conn.close()

if __name__ == "__main__":
    clear_tables()
    print("Tables cleared successfully.")
