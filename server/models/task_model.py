import sqlite3
import pickle
import logging
from config import setup_logging

setup_logging()
logger = logging.getLogger(__name__)


def save_task_to_database(email, date, time, filenames, filetype):
    # Connect to SQLite database
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    serialized_filenames = pickle.dumps(filenames)
    logging.info("Writing in database")

    # Create tasks table if it doesn't exist
    cursor.execute(
        """
		CREATE TABLE IF NOT EXISTS tasks (
			task_id INTEGER PRIMARY KEY AUTOINCREMENT,
			email TEXT,
			date TEXT,
			time TEXT,
			filenames BLOB,
			filetype TEXT,
			result TEXT,
			status TEXT
		)
	"""
    )

    # Save task to database
    cursor.execute(
        """
		INSERT INTO tasks (email, date,time,filenames,filetype, status)
		VALUES (?,?,?,?,?, 'pending')
	""",
        (email, date, time, serialized_filenames, filetype),
    )

    conn.commit()
    cursor.close()
    conn.close()

    task_id = cursor.lastrowid
    return task_id
