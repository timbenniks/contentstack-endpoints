export function getUrlPrefix(cloud, region) {
    return cloud === 'default'
        ? region === 'eu' ? 'eu-' : ''
        : `${cloud}-${region}-`;
}
