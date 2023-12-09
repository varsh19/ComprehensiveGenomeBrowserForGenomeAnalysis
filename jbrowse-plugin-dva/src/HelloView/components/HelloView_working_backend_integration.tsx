import { getSession } from '@jbrowse/core/util'
import { getSnapshot } from 'mobx-state-tree'
import React, { useRef, useState } from 'react'

export default function ReactComponent({ model }: { model: any }) {
  const [error, setError] = useState<unknown>()
  const ref = useRef<HTMLInputElement>(null)
  const refFile1 = useRef<HTMLInputElement>(null)
  const refFile2 = useRef<HTMLInputElement>(null)

  const session = getSession(model)
  
  return (
    <div style={{ padding: 50 }}>
      <h1>Analytics plugin</h1>
      
      <div style={{ display: 'flex' }}>

        <div style={{ flex: 1, marginRight: '10px' }}>
        <h2>Gene Prediction</h2>
          <p>
            Perform gene prediction with GeneMarkS2
          </p>
          <label>Upload a FASTQ for Read 1: </label>
          <input ref={refFile1} type="file" />
          <br />
          <label>Upload a FASTQ for Read 2: </label>
          <input ref={refFile2} type="file" />
          <div style={{ margin: '10px 0' }}></div>
          <button
            onClick={async () => {
              try {
                if (!ref.current) {
                  return;
                }
                const read1 = refFile1.current.files[0];
                const read2 = refFile2.current.files[0];
                console.log('Uploaded File for Read 1:', read1);
                console.log('Uploaded File for Read 2:', read2);
                await run_fastp(read1, read2); // Pass read1 and read2 to run_fastp
              } catch (e) {
                console.error(e);
                setError(e);
              }
            }}
          >
            Submit
          </button>
          {error !== undefined ? (
            <div style={{ color: 'red' }}>{`${error}`}</div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

const run_fastp = async (read1, read2) => {
  try {
    const formData = new FormData();
    formData.append('read1', read1);
    formData.append('read2', read2);

    const response = await fetch('http://localhost:8000/app/fastp-process/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log('fastp processing result URL:', result.result_url);
      // Handle the result URL as needed
    } else {
      const error = await response.json();
      console.error('Error:', error.error);
    }
  } catch (e) {
    console.error(e);
  }
};

