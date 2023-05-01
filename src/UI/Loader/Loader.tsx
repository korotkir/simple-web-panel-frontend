import BeatLoader from "react-spinners/BeatLoader";
import { CSSProperties } from 'react';

const override: CSSProperties = {
  display: "flex",
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
};

const Loader = () => (
  <BeatLoader
    color={'#357ebd'}
    loading={true}
    cssOverride={override}
    size={60}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
)

export default Loader