import { useControls } from "leva";
import { Perf } from "r3f-perf";

const Settings = () => {
  const { display } = useControls("Show Performance", {
    display: false,
  });
  console.log("🚀 ~ file: index.jsx:10 ~ Settings ~ display:", display);
  if (!display) return null;
  return <Perf position="top-left" />;
};

export default Settings;
