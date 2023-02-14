from utils.image_to_text import image_to_text
from utils.pdf_to_text import pdf_to_text
import pickle
import os
import sqlite3
from datetime import datetime


def run_scheduled_tasks():
	try:
		# Connect to SQLite database
		conn = sqlite3.connect('tasks.db')
		cursor = conn.cursor()

		# Get all pending tasks
		cursor.execute('''
			SELECT task_id, email, date,time,filenames,filetype
			FROM tasks
			WHERE  status = 'pending'
		''')
		tasks = cursor.fetchall()

		# Run tasks that are due
		for task_id,email, date,time,filenames,filetype in tasks:
			# Convert the date and time from the form into a datetime object
			form_datetime = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")
			# Get the current date and time
			current_datetime = datetime.now()

			if current_datetime>=form_datetime:
				if filetype=="img":
					result = image_to_text(email,pickle.loads(filenames))
				else:
					result = pdf_to_text(email,pickle.loads(filenames))
				cursor.execute('''
					UPDATE tasks
					SET status = 'finished', result = ?
					WHERE task_id = ?
				''', (result, task_id))
				cursor.close()
				conn.commit()
				conn.close()
	except:
		print("🐛 in run_scheduled_tasks")
	return

# check if database + table exists + len(rows)>0
def verify_and_run_schedule():
	try:
		database_name="tasks.db"
		table_name="tasks"
		if not os.path.exists(database_name):
			print("Database doesnot exist")
			return False

		conn = sqlite3.connect(database_name)
		cursor = conn.cursor()
		cursor.execute("SELECT name from sqlite_master WHERE type='table' AND name=?", (table_name,))
		table_exists = cursor.fetchone() is not None


		if table_exists:
			cursor.execute("SELECT count(*) FROM {}".format(table_name))
			rows = cursor.fetchone()
			table_not_empty = rows[0] > 0
		else:
			table_not_empty = False

		cursor.close()
		conn.close()

		if table_exists and table_not_empty:
			run_scheduled_tasks()
			return
		print("⏰ Table doesn't exist or no any tasks to run ")
		return
	except Exception as e:
		print("🐛 in verify_and_run_schedule",e)
