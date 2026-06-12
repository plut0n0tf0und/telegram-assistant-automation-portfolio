"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Lightning, 
  TelegramLogo, 
  Table, 
  Brain, 
  Sparkle, 
  Code, 
  Calculator, 
  GitFork, 
  FileCode, 
  Stack, 
  MagnifyingGlassPlus, 
  MagnifyingGlassMinus, 
  CornersOut, 
  Info,
  X,
  Lock
} from "@phosphor-icons/react";
import workflowData from "../../Telegram Automation Bot (1).json";

interface NodeItem {
  id: string;
  name: string;
  type: string;
  position: number[];
  parameters?: any;
  credentials?: any;
  disabled?: boolean;
}

interface ConnectionTarget {
  node: string;
  type: string;
  index: number;
}

interface ConnectionSource {
  [connectionType: string]: ConnectionTarget[][];
}

interface WorkflowConnections {
  [nodeName: string]: ConnectionSource;
}

export default function WorkflowCanvas() {
  const [nodes] = useState<NodeItem[]>(workflowData.nodes as unknown as NodeItem[]);
  const [connections] = useState<WorkflowConnections>(workflowData.connections as WorkflowConnections);
  
  // Canvas Viewport State
  const [scale, setScale] = useState(0.65);
  const [translate, setTranslate] = useState({ x: 120, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<NodeItem | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Coordinate Scaling Factors (Tighter spacing to prevent them being too far apart)
  const scaleX = 1.35;
  const scaleY = 1.25;
  const nodeWidth = 220;
  const nodeHeight = 84;

  const getNodePos = (node: NodeItem): [number, number] => {
    return [node.position[0] * scaleX, node.position[1] * scaleY];
  };
  
  // Fit workflow to view bounds on mount
  useEffect(() => {
    fitToView();
  }, [nodes]);

  const fitToView = () => {
    if (nodes.length === 0) return;
    
    // Find bounds based on scaled coordinates
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    nodes.forEach(node => {
      const [x, y] = getNodePos(node);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    });

    const margin = 120;
    const width = maxX - minX + margin * 2;
    const height = maxY - minY + margin * 2;

    const containerWidth = containerRef.current?.clientWidth || 800;
    const containerHeight = containerRef.current?.clientHeight || 500;

    const scaleXFit = containerWidth / width;
    const scaleYFit = containerHeight / height;
    const newScale = Math.max(0.3, Math.min(1.1, Math.min(scaleXFit, scaleYFit)));

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    setTranslate({
      x: containerWidth / 2 - centerX * newScale,
      y: containerHeight / 2 - centerY * newScale
    });
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest(".interactive-node") || target.closest(".canvas-control-btn")) return;
    
    setIsDragging(true);
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTranslate({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Helpers to get node by name
  const getNodeByName = (name: string) => {
    return nodes.find(n => n.name === name);
  };

  // Determine type styling - Simulating authentic, premium n8n dark mode node styles
  const getNodeStyle = (type: string) => {
    const t = type.toLowerCase();
    
    // Default: Action Node
    let icon = Stack;
    let label = "Workflow Action";
    let border = "border-[#2d2d30]";
    let bg = "bg-[#18181b]"; // zinc-900
    let accent = "bg-[#71717a]"; // grey stripe
    let color = "text-gray-400";

    if (t.includes("telegramtrigger")) {
      icon = Lightning;
      label = "Telegram Trigger";
      border = "border-[#10b981]/30";
      accent = "bg-[#10b981]"; // Green stripe for Triggers
      color = "text-[#10b981]";
    } else if (t.includes("telegram")) {
      icon = TelegramLogo;
      label = "Telegram Action";
      border = "border-[#ff6f5b]/30";
      accent = "bg-[#ff6f5b]"; // n8n salmon/orange for Integrations
      color = "text-[#ff6f5b]";
    } else if (t.includes("googlesheets") && t.includes("tool")) {
      icon = Table;
      label = "Google Sheets Tool";
      border = "border-[#10b981]/30";
      accent = "bg-[#10b981]"; // Sheets are green in n8n
      color = "text-[#10b981]";
    } else if (t.includes("googlesheets")) {
      icon = Table;
      label = "Google Sheets";
      border = "border-[#10b981]/30";
      accent = "bg-[#10b981]";
      color = "text-[#10b981]";
    } else if (t.includes("gemini") || t.includes("deepseek")) {
      icon = Sparkle;
      label = t.includes("gemini") ? "Gemini LLM" : "DeepSeek LLM";
      border = "border-[#a855f7]/30";
      accent = "bg-[#a855f7]"; // Purple/Indigo for AI
      color = "text-[#a855f7]";
    } else if (t.includes("agent")) {
      icon = Brain;
      label = "AI Agent";
      border = "border-[#a855f7]/30";
      accent = "bg-[#a855f7]";
      color = "text-[#a855f7]";
    } else if (t.includes("toolcode") || t.includes("code")) {
      icon = Code;
      label = t.includes("toolcode") ? "Agent Code Tool" : "JavaScript Code";
      border = "border-[#facc15]/30";
      accent = "bg-[#facc15]"; // Yellow stripe for scripts
      color = "text-[#facc15]";
    } else if (t.includes("calculator")) {
      icon = Calculator;
      label = "Calculator Tool";
      border = "border-[#3b82f6]/30";
      accent = "bg-[#3b82f6]";
      color = "text-[#3b82f6]";
    } else if (t.includes("if") || t.includes("switch")) {
      icon = GitFork;
      label = t.includes("if") ? "Conditional If" : "Router Switch";
      border = "border-[#6366f1]/30";
      accent = "bg-[#6366f1]"; // Indigo for Logic nodes
      color = "text-[#6366f1]";
    } else if (t.includes("converttofile")) {
      icon = FileCode;
      label = "Convert File";
      border = "border-[#71717a]/30";
      accent = "bg-[#71717a]";
      color = "text-[#71717a]";
    }

    return { icon, color, border, bg, accent, label };
  };

  // Compile all connections to path datasets
  const getRenderedConnections = () => {
    const paths: Array<{
      d: string;
      source: string;
      target: string;
      type: string;
      key: string;
    }> = [];

    Object.entries(connections).forEach(([sourceName, connectionTypes]) => {
      const sourceNode = getNodeByName(sourceName);
      if (!sourceNode) return;

      Object.entries(connectionTypes).forEach(([connectionType, outputs]) => {
        outputs.forEach((targetList, outputIndex) => {
          targetList.forEach((target) => {
            const targetNode = getNodeByName(target.node);
            if (!targetNode) return;

            // Output port position (right side) - Scaled
            const [sourceX, sourceY] = getNodePos(sourceNode);
            const x1 = sourceX + nodeWidth;
            const numOutputs = outputs.length;
            const y1 = sourceY + (numOutputs > 1 
              ? (outputIndex + 0.5) * (nodeHeight / numOutputs) 
              : nodeHeight / 2);

            // Input port position (left side) - Scaled
            const [targetX, targetY] = getNodePos(targetNode);
            const x2 = targetX;
            const y2 = targetY + nodeHeight / 2;

            // Curved Bezier calculation
            const controlOffset = Math.max(80, Math.abs(x2 - x1) * 0.45);
            const d = `M ${x1} ${y1} C ${x1 + controlOffset} ${y1}, ${x2 - controlOffset} ${y2}, ${x2} ${y2}`;

            paths.push({
              d,
              source: sourceName,
              target: target.node,
              type: connectionType,
              key: `${sourceName}-${connectionType}-${outputIndex}-${target.node}-${target.index}`
            });
          });
        });
      });
    });

    return paths;
  };

  const isNodeConnectedToHovered = (nodeName: string) => {
    if (!hoveredNode) return false;
    if (nodeName === hoveredNode) return true;
    
    const renderedPaths = getRenderedConnections();
    return renderedPaths.some(p => 
      (p.source === hoveredNode && p.target === nodeName) || 
      (p.target === hoveredNode && p.source === nodeName)
    );
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-[680px] bg-[#141414] border border-[var(--color-outline)] rounded-[var(--radius-xl)] overflow-hidden relative select-none">
      
      {/* Canvas Area (Wheel zoom disabled, styled with n8n dot grid pattern) */}
      <div 
        ref={containerRef}
        className="flex-1 h-full relative overflow-hidden bg-[#101010] cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* n8n Dotted Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.25]" 
          style={{
            backgroundImage: "radial-gradient(#262626 1.8px, transparent 1.8px)",
            backgroundSize: "22px 22px",
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: "0 0"
          }}
        />

        {/* Floating Controls */}
        <div className="absolute bottom-5 left-5 flex items-center gap-2.5 z-20 bg-[var(--color-surface-container)] border border-[var(--color-outline)] p-2 rounded-lg">
          <button 
            onClick={() => setScale(s => Math.min(s * 1.25, 2.0))}
            className="canvas-control-btn p-2 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors"
            title="Zoom In"
          >
            <MagnifyingGlassPlus className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setScale(s => Math.max(s / 1.25, 0.15))}
            className="canvas-control-btn p-2 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors"
            title="Zoom Out"
          >
            <MagnifyingGlassMinus className="w-5 h-5" />
          </button>
          <button 
            onClick={fitToView}
            className="canvas-control-btn p-2 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors"
            title="Fit to Screen"
          >
            <CornersOut className="w-5 h-5" />
          </button>
          <div className="w-[1px] h-5 bg-[var(--color-outline)] mx-1" />
          <span className="text-sm text-gray-400 font-mono px-2 select-none">
            {Math.round(scale * 100)}%
          </span>
        </div>

        {/* Viewport Transform Wrapper */}
        <div 
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: "0 0",
            position: "absolute",
            width: "100%",
            height: "100%"
          }}
        >
          {/* SVG Connection Lines */}
          <svg className="absolute overflow-visible top-0 left-0 w-full h-full pointer-events-none z-0">
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3f3f46" />
              </marker>
              <marker
                id="arrow-hover"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#fff" />
              </marker>
            </defs>
            {getRenderedConnections().map((path) => {
              const isHovered = hoveredNode === path.source || hoveredNode === path.target;
              
              let strokeColor = "#3f3f46"; // n8n default connection grey line
              let strokeWidth = 2.0;
              if (isHovered) {
                strokeColor = "#ffffff";
                strokeWidth = 2.5;
              }

              return (
                <path
                  key={path.key}
                  d={path.d}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  markerEnd={isHovered ? "url(#arrow-hover)" : "url(#arrow)"}
                  className="transition-colors duration-150"
                />
              );
            })}
          </svg>

          {/* Render Nodes */}
          {nodes.map((node) => {
            const [x, y] = getNodePos(node);
            const style = getNodeStyle(node.type);
            const NodeIcon = style.icon;
            
            const isSelected = selectedNode?.id === node.id;
            const isHovered = hoveredNode === node.name;
            const isDimmed = hoveredNode !== null && !isNodeConnectedToHovered(node.name);

            return (
              <div
                key={node.id}
                style={{
                  left: x,
                  top: y,
                  width: nodeWidth,
                  height: nodeHeight,
                  position: "absolute"
                }}
                className={`interactive-node absolute rounded-lg border ${
                  isSelected 
                    ? "border-white bg-[#1a1a1a] shadow-[0_0_12px_rgba(255,255,255,0.15)] z-20" 
                    : isHovered
                      ? "border-neutral-500 bg-[#161616] z-10"
                      : `${style.border} ${style.bg}`
                } pl-4 pr-3 py-3 transition-all duration-200 select-none cursor-pointer flex flex-col justify-between ${
                  isDimmed ? "opacity-25" : "opacity-100"
                } ${node.disabled ? "opacity-35 filter grayscale" : ""}`}
                onClick={() => setSelectedNode(node)}
                onMouseEnter={() => setHoveredNode(node.name)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Accent Left Edge - Simulating n8n left stripe */}
                <div className={`absolute top-0 bottom-0 left-0 w-[5px] rounded-l-lg ${style.accent}`} />
                
                {/* Node Metadata & Icon */}
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md bg-black/50 shrink-0 ${style.color}`}>
                    <NodeIcon className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden flex-1">
                    {/* Bounded to 16px text-base */}
                    <div className="text-base font-bold text-white truncate tracking-wide leading-tight">
                      {node.name}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono truncate uppercase mt-0.5">
                      {style.label}
                    </div>
                  </div>
                </div>

                {/* Node Indicators / Connectors UI representation */}
                <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono mt-1 pt-1.5 border-t border-white/5">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                    <span>In</span>
                  </div>
                  {node.disabled && (
                    <span className="text-red-500/70 text-[8px] font-bold tracking-tighter">DISABLED</span>
                  )}
                  <div className="flex items-center gap-1">
                    <span>Out</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Inspector Panel */}
      <div 
        className={`w-full lg:w-[350px] h-[350px] lg:h-full border-t lg:border-t-0 lg:border-l border-[var(--color-outline)] bg-[var(--color-surface-container)] flex flex-col transition-all duration-300 z-10 ${
          selectedNode ? "translate-y-0 lg:translate-x-0" : "translate-y-full lg:translate-y-0 lg:translate-x-full hidden"
        }`}
      >
        {selectedNode && (
          <>
            {/* Inspector Header */}
            <div className="p-5 border-b border-[var(--color-outline)] flex items-center justify-between bg-black/10">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded bg-black/40 ${getNodeStyle(selectedNode.type).color}`}>
                  {React.createElement(getNodeStyle(selectedNode.type).icon, { className: "w-5 h-5" })}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-wide truncate max-w-[200px]">
                    {selectedNode.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-mono uppercase mt-0.5">
                    {getNodeStyle(selectedNode.type).label}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedNode(null)}
                className="p-1.5 text-gray-500 hover:text-white rounded hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inspector Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar text-base select-text">
              {/* Type Metadata */}
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Node Type ID</span>
                <span className="font-mono text-xs text-gray-300 break-all bg-black/20 px-2 py-1.5 rounded block mt-1.5">
                  {selectedNode.type}
                </span>
              </div>

              {/* JS Code Node Parameters */}
              {selectedNode.parameters?.jsCode && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">JavaScript Execution</span>
                  <div className="relative group rounded border border-[var(--color-outline)] bg-black/40 overflow-hidden mt-1.5">
                    <pre className="p-4.5 text-xs font-mono text-amber-350/90 overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar max-h-[250px]">
                      <code>{selectedNode.parameters.jsCode}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* AI Agent prompt */}
              {selectedNode.parameters?.options?.systemMessage && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">AI System Prompt</span>
                  <p className="text-base text-gray-300 bg-black/30 p-3.5 rounded border border-white/5 leading-relaxed">
                    {selectedNode.parameters.options.systemMessage}
                  </p>
                </div>
              )}

              {/* Sheet name / options */}
              {selectedNode.parameters?.sheetName && (
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Target Spreadsheet</span>
                    <span className="font-mono text-base text-emerald-400 mt-1 block">
                      {selectedNode.parameters.sheetName.cachedResultName || "ItemsList"}
                    </span>
                  </div>
                  {selectedNode.parameters.sheetName.cachedResultUrl && (
                    <div>
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Google Sheets URL</span>
                      <a 
                        href={selectedNode.parameters.sheetName.cachedResultUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-sm font-mono text-blue-400 break-all underline block mt-1"
                      >
                        {selectedNode.parameters.sheetName.cachedResultUrl}
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Text parameters (Messages etc) */}
              {selectedNode.parameters?.text && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Reply Content Template</span>
                  <pre className="p-3.5 text-sm font-mono text-sky-300 bg-black/30 rounded border border-white/5 overflow-x-auto max-h-[180px] whitespace-pre-wrap leading-relaxed">
                    {selectedNode.parameters.text}
                  </pre>
                </div>
              )}

              {/* Chat Id parameters */}
              {selectedNode.parameters?.chatId && (
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Destination Chat ID</span>
                  <span className="font-mono text-sm text-gray-400 block mt-1.5">
                    {selectedNode.parameters.chatId}
                  </span>
                </div>
              )}

              {/* Credentials mapping */}
              {selectedNode.credentials && (
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Credentials Mapping</span>
                  <div className="space-y-2 mt-2">
                    {Object.entries(selectedNode.credentials).map(([credName, credValue]: any) => (
                      <div key={credName} className="flex items-center gap-2.5 text-xs bg-black/25 px-3 py-2 rounded border border-white/5">
                        <Lock className="w-4 h-4 text-gray-500 shrink-0" />
                        <span className="text-gray-400 font-mono">{credName}:</span>
                        <span className="text-gray-200 font-mono truncate">{credValue.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Catch-all other parameters */}
              {(!selectedNode.parameters?.jsCode && 
                !selectedNode.parameters?.options?.systemMessage && 
                !selectedNode.parameters?.sheetName && 
                !selectedNode.parameters?.text) && (
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Configuration Parameters</span>
                  <pre className="p-3.5 text-xs font-mono text-gray-400 bg-black/30 rounded border border-white/5 overflow-x-auto max-h-[220px] custom-scrollbar">
                    {JSON.stringify(selectedNode.parameters || {}, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Click prompt overlay when no node is selected */}
      {!selectedNode && (
        <div className="absolute top-5 right-5 z-10 flex items-center gap-2 bg-[var(--color-surface-container)] border border-[var(--color-outline)] px-4 py-2 rounded-full text-xs text-gray-400 pointer-events-none select-none">
          <Info className="w-4.5 h-4.5 text-gray-500" />
          <span>Click a node to inspect its configurations & parameters</span>
        </div>
      )}
    </div>
  );
}
