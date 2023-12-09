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
        {/* First Div */}
        <div style={{ flex: 1, marginRight: '10px' }}>
          <h2>Quality Trimming</h2>
          <p>
            Perform quality trimming with FastP
          </p>
          <label>Upload a FASTQ for Read 1: </label>
          <input ref={ref} type="file" />
          <br />
          <label>Upload a FASTQ for Read 2: </label>
          <input ref={ref} type="file" />
          <div style={{ margin: '10px 0' }}></div>
          <button
            onClick={async () => {
              try {
                if (!ref.current) {
                  return
                }
              console.log('here', ref.current.files?.[0])
              // const res = await fetch('/api/upload', { method: 'POST' })
              // if (!res.ok) {
              //   throw new Error(
              //     `HTTP ${res.status} ${await res.text()} uploading file`,
              //   )
              // }
              // const result = res.json()
              // const fastaFile = result.fastaFile
              // const faiFile = result.faiFile
              const express = require('express');
              const multer = require('multer');
              
              const app = express();
              const upload = multer({ dest: 'uploads/' });
              
              app.post('/api/upload', upload.single('file'), (req, res) => {
                // Handle the uploaded file here
                const fileName = req.file.filename;
              
                // You can access the path where the file is stored
                const filePath = req.file.path;
              
                // Send a response to the client
                res.json({ fileName, filePath });
              });
              
              app.listen(3000, () => {
                console.log('Server is running on port 3000');
              });
              
              const fastaFile = '/test_data/volvox/volvox.fa'
              const faiFile = '/test_data/volvox/volvox.fa.fai'
              session.addSessionAssembly({
                name: 'newvolvox',
                sequence: {
                  type: 'ReferenceSequenceTrack',
                  trackId: 'newvolvox_refseq',
                  adapter: {
                    type: 'IndexedFastaAdapter',
                    fastaLocation: {
                      uri: fastaFile,
                      locationType: 'UriLocation',
                    },
                    faiLocation: {
                      uri: faiFile,
                      locationType: 'UriLocation',
                    },
                  },
                },
              })
              const view = session.addView('LinearGenomeView')
              // dynamically navigate to a position on the new assembly!
              view.navToLocString('ctgB:893..968', 'newvolvox')
              } catch (e) {
                console.error(e)
                setError(e)
              }
            }}
          >
            Submit
          </button>
          {error !== undefined ? (
            <div style={{ color: 'red' }}>{`${error}`}</div>
          ) : null}
        </div>

        {/* Second Div */}
        <div style={{ flex: 1, marginRight: '10px' }}>
        <h2>Genome Assembly</h2>
          <p>
            Perform a de novo assembly with Spades
          </p>
          <label>Upload a FASTQ for Read 1: </label>
          <input ref={ref} type="file" />
          <br />
          <label>Upload a FASTQ for Read 2: </label>
          <input ref={ref} type="file" />
          <div style={{ margin: '10px 0' }}></div>
          <button
            onClick={async () => {
              try {
                if (!ref.current) {
                  return
                }
              // console.log('here', ref.current.files?.[0].name)
              // const res = await fetch('/api/upload', { method: 'POST' })
              // if (!res.ok) {
              //   throw new Error(
              //     `HTTP ${res.status} ${await res.text()} uploading file`,
              //   )
              // }
              // const result = res.json()
              // const fastaFile = result.fastaFile
              // const faiFile = result.faiFile
              const fastaFile = 'https://api.github.com/dgroves6/JBrowse2-Plugin/blob/main/GCF_001890245.1_ASM189024v1_genomic.fna'
              const faiFile = 'https://api.github.com/dgroves6/JBrowse2-Plugin/blob/main/GCF_001890245.1_ASM189024v1_genomic.fna.fai'
              /*const fastaFile = fetch('https://api.github.com/dgroves6/JBrowse2-Plugin/blob/main/GCF_001890245.1_ASM189024v1_genomic.fna')
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
              const faiFile = fetch('https://api.github.com/dgroves6/JBrowse2-Plugin/blob/main/GCF_001890245.1_ASM189024v1_genomic.fna.fai')
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));*/
              session.addSessionAssembly({
                name: 'ecoli_pane2 ',
                sequence: {
                  type: 'ReferenceSequenceTrack',
                  trackId: 'ecoli_refseq',
                  adapter: {
                    type: 'IndexedFastaAdapter',
                    fastaLocation: {
                      uri: fastaFile,
                      locationType: 'UriLocation',
                    },
                    faiLocation: {
                      uri: faiFile,
                      locationType: 'UriLocation',
                    },
                  },
                },
              })
              const view = session.addView('LinearGenomeView')
              } catch (e) {
                console.error(e)
                setError(e)
              }
            }}
          >
            Submit
          </button>
          {error !== undefined ? (
            <div style={{ color: 'red' }}>{`${error}`}</div>
          ) : null}
        </div>

        {/* Third Div */}
        <div style={{ flex: 1, marginRight: '10px' }}>
        <h2>Gene Prediction</h2>
          <p>
            Perform gene prediction with GeneMarkS2
          </p>
          <label>Upload a FASTA: </label>
          <input ref={ref} type="file" />
          <br />
          <button
            onClick={async () => {
              try {
                if (!ref.current) {
                  return
                }
              // console.log('here', ref.current.files?.[0].name)
              // const res = await fetch('/api/upload', { method: 'POST' })
              // if (!res.ok) {
              //   throw new Error(
              //     `HTTP ${res.status} ${await res.text()} uploading file`,
              //   )
              // }
              // const result = res.json()
              // const fastaFile = result.fastaFile
              // const faiFile = result.faiFile
              const fastaFile = '/test_data/volvox/volvox.fa'
              const faiFile = '/test_data/volvox/volvox.fa.fai'
              session.addSessionAssembly({
                name: 'newvolvox',
                sequence: {
                  type: 'ReferenceSequenceTrack',
                  trackId: 'newvolvox_refseq',
                  adapter: {
                    type: 'IndexedFastaAdapter',
                    fastaLocation: {
                      uri: fastaFile,
                      locationType: 'UriLocation',
                    },
                    faiLocation: {
                      uri: faiFile,
                      locationType: 'UriLocation',
                    },
                  },
                },
              })
              const view = session.addView('LinearGenomeView')
              // dynamically navigate to a position on the new assembly!
              view.navToLocString('ctgB:1..1000', 'newvolvox')
              } catch (e) {
                console.error(e)
                setError(e)
              }
            }}
          >
            Submit
          </button>
          {error !== undefined ? (
            <div style={{ color: 'red' }}>{`${error}`}</div>
          ) : null}
        </div>

        {/* Fourth Div */}
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
                  return
                }
              // const read1 = refFile1.current.files[0];
              // const read2 = refFile2.current.files[0];
              const read1 = '/test_data/dva_pipeline/CGT1020_1_trim.fq.gz'
              const read2 = '/test_data/dva_pipeline/CGT1020_2_trim.fq.gz'
              console.log('Uploaded File:', read1);
              console.log('Uploaded File:', read2);
              } catch (e) {
                console.error(e)
                setError(e)
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

const run_fastp = async () => {
  try {
      const formData = new FormData();
      formData.append('read1', read1);
      formData.append('read2', read2);

      const response = await fetch('http://localhost:8000/assemble-reads/', {
          method: 'POST',
          body: formData,
      });

      if (response.ok) {
          const result = await response.json();
          console.log('Assembly result URL:', result.result_url);
          // Handle the result URL as needed
      } else {
          const error = await response.json();
          console.error('Error:', error.error);
      }
  } catch (e) {
      console.error(e);
  }
};
