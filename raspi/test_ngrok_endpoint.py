import multiprocessing
import subprocess

# The endpoint to be tested
url = "https://f8a1-2001-e68-5419-b516-8dc3-85d2-7c13-be7c.ngrok-free.app/data"
url2 = "http://84.247.151.195:3000/data"
url3 = "http://greenesis:3000/data"

# Function to make a curl request to the endpoint with a timeout
def make_request():
    try:
        # Run curl with a 5-second timeout
        result = subprocess.run(["curl", url, "--max-time", "5"], capture_output=True, text=True)
        print(f"{multiprocessing.current_process().name} Output: {result.stdout}")
    except subprocess.TimeoutExpired:
        print(f"{multiprocessing.current_process().name} encountered a timeout.")
    except Exception as e:
        print(f"{multiprocessing.current_process().name} encountered an error: {e}")

# Create and start 5 processes
if __name__ == "__main__":
    processes = []
    for i in range(10):
        process = multiprocessing.Process(target=make_request, name=f"Process-{i+1}")
        processes.append(process)
        process.start()

    # Wait for all processes to complete
    for process in processes:
        process.join()

    print("All processes completed.")
