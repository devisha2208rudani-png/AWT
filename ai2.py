from collections import deque

def water_jug_bfs(m, n, d):
    visited = set()
    queue = deque()

    queue.append((0, 0))
    visited.add((0, 0))


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

            next_state=[]

            next_state.append((m,y))
            next_state.append((x,y))

            next_state.append
