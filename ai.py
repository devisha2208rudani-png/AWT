from collections import deque

def water_jug_bfs(m, n, d):
    visited = set()
    queue = deque()

    queue.append((0, 0))
    visited.add((0, 0))

    parent = {}
    action = {}

    while queue:
        x, y = queue.popleft()

        if x == d or y == d:
            path = []
            while (x, y) != (0, 0):
                path.append((action[(x, y)], (x, y)))
                x, y = parent[(x, y)]
            path.reverse()

            print("Steps:")
            for step in path:
                print(step)
            return

        next_states = []


        next_states.append((m, y))   
        next_states.append((x, n))  

   
        next_states.append((0, y))  
        next_states.append((x, 0))  


        t = min(x, n - y)
        next_states.append((x - t, y + t))

        t = min(y, m - x)
        next_states.append((x + t, y - t))

        for nx, ny in next_states:
            if (nx, ny) not in visited:
                visited.add((nx, ny))
                parent[(nx, ny)] = (x, y)

                if nx == m and ny == y:
                    action[(nx, ny)] = "Fill jug1"
                elif nx == x and ny == n:
                    action[(nx, ny)] = "Fill jug2"
                elif nx == 0 and ny == y:
                    action[(nx, ny)] = "Empty jug1"
                elif nx == x and ny == 0:
                    action[(nx, ny)] = "Empty jug2"
                else:
                    action[(nx, ny)] = "Transfer"

                queue.append((nx, ny))

    print("No solution is possible")


m = 4 
n = 6
d = 2   

water_jug_bfs(m, n, d)