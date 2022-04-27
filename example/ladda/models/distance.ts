export default function distanceBetweenCoordinates(post, position) {
  const R = 6371e3; // metres
  const φ1 = post.latitude * Math.PI/180; // φ, λ in radians
  const φ2 = position.latitude * Math.PI/180;
  const Δφ = (position.latitude-post.latitude) * Math.PI/180;
  const Δλ = (position.longitude-post.longitude) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c; // in metres
  return d;
};
