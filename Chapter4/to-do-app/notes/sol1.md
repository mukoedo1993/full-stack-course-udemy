Try this one

```
sudo lsof -i :3000
```

COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME
node 20152 abc 21u IPv6 195004 0t0 TCP *:http (LISTEN)

```
sudo kill -9 20152
```