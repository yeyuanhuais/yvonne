import React, { useState, useRef, useEffect } from "react";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view/dist/index.esm";

const transformer = new Transformer();

export default ({ initValue = "" }) => {
  const [value, setValue] = useState(initValue);
  // Ref for SVG element
  const refSvg = useRef();
  // Ref for markmap object
  const refMm = useRef();

  useEffect(() => {
    // Create markmap and save to refMm
    if (refMm.current) return;
    refMm.current = Markmap.create(refSvg.current);
  }, [refSvg.current]);

  useEffect(() => {
    // Update data for markmap once value is changed
    const mm = refMm.current;
    if (!mm) return;
    const { root } = transformer.transform(value);
    mm.setData(root);
    mm.fit();
  }, [refMm.current, value]);

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <React.Fragment>
      {/* <div className="flex-1">
        <textarea className="w-full h-full border border-gray-400" value={value} onChange={handleChange} />
      </div> */}
      <svg className="flex-1" ref={refSvg} height="500" width="100%"/>
    </React.Fragment>
  );
};
