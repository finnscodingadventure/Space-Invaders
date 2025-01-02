# Plesk Docker Deployment Checklist

## Initial Setup

- [ ] Docker container added in Plesk
- [ ] Environment variables properly set
- [ ] Proxy rules configured
- [ ] SSL certificate installed and active

## Container Health

- [ ] Container status is "Running"
- [ ] No error messages in container logs
- [ ] Container restarts automatically if stopped

## Game Functionality

- [ ] Game loads correctly at domain URL
- [ ] All game assets (3D models, textures) load
- [ ] Holgi Modus works properly
- [ ] Game controls respond correctly

## Security

- [ ] HTTPS working correctly
- [ ] SSL certificate valid
- [ ] Security headers present
- [ ] Assets loading securely

## Performance

- [ ] Loading time acceptable
- [ ] No lag in gameplay
- [ ] Assets cached correctly
- [ ] No console errors

## Monitoring

- [ ] Container resource usage normal
- [ ] Logs accessible and clear
- [ ] No repeated error messages
- [ ] Automatic container recovery working

## Troubleshooting Steps

If the game doesn't load:
1. Check container logs: `Docker` > `Containers` > `space-invaders-3d` > `Logs`
2. Verify proxy rules are correct
3. Check SSL configuration
4. Verify domain DNS settings

If performance issues occur:
1. Monitor container resources
2. Check nginx access logs
3. Verify caching headers
4. Test network latency
