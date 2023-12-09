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
  

        {/* Third Div */}
        <div style={{ flex: 1, marginRight: '10px' }}>
        <h2>Gene Prediction</h2>
          <p>
            Perform gene prediction with GeneMarkS2
          </p>
          <label>Upload a FASTA: </label>
          <input ref={ref} type="file" />
          <div style={{ margin: '10px 0' }}></div>
          <button
            onClick={async () => {
              try {
                if (!ref.current) {
                  return
                }
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
        <h2>Gene Annotation</h2>
          <p>
            Perform gene annotation with eggNOG
          </p>
          <label>Upload a GFF3: </label>
          <input ref={refFile1} type="file" />
          <div style={{ margin: '10px 0' }}></div>
          <button
            onClick={async () => {
              try {
                if (!ref.current) {
                  return
                }
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
        </div>
    </div>
  )
}
