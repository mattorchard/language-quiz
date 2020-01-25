import greek from "../datasheets/greek";

const StatsPage = () => (
  <main>
    <h2>Stats</h2>
    <p>No Stats are being tracked yet, so here's the raw data being used</p>
    <pre>{JSON.stringify(greek, null, 2)}</pre>
  </main>
);

export default StatsPage;
