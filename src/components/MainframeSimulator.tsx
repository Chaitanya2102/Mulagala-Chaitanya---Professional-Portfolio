import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, RefreshCw, Terminal, Cpu, Database, FileText } from 'lucide-react';

interface JobOption {
  id: string;
  name: string;
  jclMember: string;
  desc: string;
  program: string;
  inputDataset: string;
  outputDataset: string;
}

const jobs: JobOption[] = [
  {
    id: 'HLTH001',
    name: 'HLTHHOST - Mass Policy Data Extraction',
    jclMember: 'JC01HLTH',
    desc: 'Extracts 50,000+ active policyholder records from DB2 and generates sequential VSAM extract for downstream analytics.',
    program: 'HLTHHOST.cbl',
    inputDataset: 'PROD.DB2.HEALTH.POLICIES',
    outputDataset: 'PROD.VSAM.EXTRACT.POLICIES.G001V00'
  },
  {
    id: 'CLMS002',
    name: 'CLMREP01 - Monthly Claims Defect Triage',
    jclMember: 'JC02CLMS',
    desc: 'Performs batch integrity audit, matches claims against authorization master, and writes formatted SLA summary reports.',
    program: 'CLMSRPT.cbl',
    inputDataset: 'PROD.DB2.CLAIMS.AUDIT',
    outputDataset: 'PROD.REPORTS.MONTHLY.CLAIMS'
  },
  {
    id: 'VSAM003',
    name: 'VSMREORG - VSAM KSDS Cluster Reorganization',
    jclMember: 'JC03REOR',
    desc: 'Executes IDCAMS REPRO & DEFINE CLUSTER to reclaim freespace and optimize key-sequenced index performance.',
    program: 'IDCAMS Utility',
    inputDataset: 'PROD.VSAM.HEALTH.KSDS',
    outputDataset: 'PROD.VSAM.HEALTH.KSDS.BACKUP'
  }
];

export const MainframeSimulator: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobOption>(jobs[0]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [processedCount, setProcessedCount] = useState<number>(0);

  const runJob = () => {
    setIsRunning(true);
    setIsCompleted(false);
    setLogs([]);
    setProcessedCount(0);

    const initialLogs = [
      `$HASP100 ${selectedJob.jclMember} ON INTRDR`,
      `$HASP373 ${selectedJob.jclMember} STARTED - INIT 04 - CLASS A - SYS IBM-Z16`,
      `IEF403I ${selectedJob.jclMember} - STARTED - TIME=20.06.42`,
      `//STEP010  EXEC PGM=${selectedJob.program},REGION=64M`,
      `//SYSIN    DD *`,
      `//INFILE   DD DSN=${selectedJob.inputDataset},DISP=SHR`,
      `//OUTFILE  DD DSN=${selectedJob.outputDataset},`,
      `//            DISP=(NEW,CATLG,DELETE),SPACE=(CYL,(50,10),RLSE)`,
      `+HLTHHOST: DB2 SUBSYSTEM DSN1 CONNECTED SUCCESSFULLY`,
      `+HLTHHOST: CURSOR C_POLICY OPENED. SQLCODE=000`
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < initialLogs.length) {
        const nextLine = initialLogs[currentLogIndex];
        setLogs(prev => [...prev, nextLine]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        // Simulate record processing ticks
        simulateProcessing();
      }
    }, 180);
  };

  const simulateProcessing = () => {
    let count = 0;
    const total = selectedJob.id === 'HLTH001' ? 48250 : selectedJob.id === 'CLMS002' ? 12400 : 89200;
    const step = Math.floor(total / 5);

    const progressInterval = setInterval(() => {
      count += step;
      if (count < total) {
        setProcessedCount(count);
        setLogs(prev => [
          ...prev,
          `+HLTHHOST: FETCH PROGRESS -> ${count.toLocaleString()} RECORDS VALIDATED & WRITTEN`
        ]);
      } else {
        setProcessedCount(total);
        clearInterval(progressInterval);
        setLogs(prev => [
          ...prev,
          `+HLTHHOST: FETCH COMPLETE -> TOTAL ${total.toLocaleString()} RECORDS COMMITTED`,
          `+HLTHHOST: DB2 CURSOR CLOSED. SQLCODE=100 (END OF TABLE)`,
          `IEF142I ${selectedJob.jclMember} STEP010 - STEP WAS EXECUTED - COND CODE 0000`,
          `IEF285I   ${selectedJob.outputDataset}   CATALOGED`,
          `IEF404I ${selectedJob.jclMember} - ENDED - TIME=20.06.45 - SYSTEM RETCODE: 0000`,
          `$HASP395 ${selectedJob.jclMember} ENDED - MAXCC=0000 (SUCCESS)`
        ]);
        setIsRunning(false);
        setIsCompleted(true);
      }
    }, 280);
  };

  useEffect(() => {
    // Run initial simulation on load
    runJob();
  }, [selectedJob]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-300 ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            IBM z/OS TSO/ISPF SDSF Job Monitor
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400">SYS: IBM-Z16</span>
          <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">NODE: STATEFARM-HOST</span>
        </div>
      </div>

      {/* Job Selector Controls */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Select Mainframe Batch JCL Stream:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {jobs.map(job => (
            <button
              key={job.id}
              onClick={() => {
                if (!isRunning) setSelectedJob(job);
              }}
              disabled={isRunning}
              className={`text-left p-2.5 rounded-lg border transition-all text-xs ${
                selectedJob.id === job.id
                  ? 'bg-cyan-950/50 border-cyan-500/60 text-cyan-200 ring-1 ring-cyan-500/30'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="font-mono font-bold text-slate-200 mb-0.5 flex items-center justify-between">
                <span>{job.jclMember}</span>
                <span className="text-[10px] text-cyan-400">{job.id}</span>
              </div>
              <p className="line-clamp-1 text-[11px] text-slate-400">{job.name}</p>
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-800/60 text-xs">
          <div className="flex items-center gap-4 text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              PGM: <strong className="text-slate-200">{selectedJob.program}</strong>
            </span>
            <span className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              DB2: <strong className="text-slate-200">HEALTH_HOST</strong>
            </span>
          </div>

          <button
            onClick={runJob}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition shadow-sm disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Executing JCL...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                Re-submit JCL Stream
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terminal Display */}
      <div className="p-4 bg-[#050811] font-mono text-xs text-emerald-400 min-h-[220px] max-h-[280px] overflow-y-auto space-y-1 select-text">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className={`transition-opacity duration-200 ${
              log.includes('MAXCC=0000') || log.includes('SUCCESS')
                ? 'text-emerald-300 font-bold bg-emerald-950/30 px-1 py-0.5 rounded'
                : log.includes('ERROR')
                ? 'text-rose-400 font-bold'
                : log.includes('FETCH PROGRESS')
                ? 'text-cyan-300'
                : log.includes('//')
                ? 'text-slate-400'
                : 'text-emerald-400/90'
            }`}
          >
            {log}
          </div>
        ))}
        {isRunning && (
          <div className="flex items-center gap-2 text-cyan-400 animate-pulse pt-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Batch step executing (I/O Buffer Active)...</span>
          </div>
        )}
      </div>

      {/* Execution Stats Footer */}
      <div className="bg-slate-950 p-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-slate-400">Records Extracted:</span>
          <span className="text-cyan-300 font-bold text-sm">
            {processedCount.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/50">
              <CheckCircle2 className="w-3.5 h-3.5" />
              STATUS: MAXCC 0000 (CLEAN)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/50">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              STATUS: PROCESSING
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
