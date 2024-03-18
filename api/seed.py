import sqlite3

# Function to seed the database
def seed_database():
    conn = sqlite3.connect('./database.sqlite')
    c = conn.cursor()

    # Seed Posts table
    for i in range(3):
        post_title = f"Post {i+1}"
        c.execute("INSERT INTO Posts (title) VALUES (?)", (post_title,))
        post_id = c.lastrowid

        # Seed Comments table
        for j in range(3):  # generating 5 comments for each post
            comment_text = f"generated comment {j+1}"
            c.execute("INSERT INTO Comments (comment, postId) VALUES (?, ?)", (comment_text, post_id))

    conn.commit()
    conn.close()

if __name__ == "__main__":
    seed_database()
    print("Database seeded successfully.")
