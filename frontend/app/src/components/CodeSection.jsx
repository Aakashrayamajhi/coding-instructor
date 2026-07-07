import React from 'react';

export default function CodeSection({ setCodeOpen, isMobileOverlay = false }) {
  return (
    <>
      <div className="editor-top">
        <div className="file-info">
          <div className="name">Solution.java</div>
          <div className="meta" style={{color:'var(--sub)'}}>Java 17</div>
        </div>

        <div className="actions" style={{display:'flex', gap:8}}>
          <button className="btn" onClick={() => navigator.clipboard?.writeText('// paste code here...').catch(()=>{})}>Copy</button>
          <button className="btn primary" onClick={() => alert('Run requested — integrate runner')}>Run</button>
          {isMobileOverlay && <button className="btn" onClick={() => typeof setCodeOpen === 'function' && setCodeOpen(false)}>Close</button>}
        </div>
      </div>

      <div className="code-area" role="region" aria-label="Code editor">
        <pre>{`import java.util.*;

class Solution {
  public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);

    while (!queue.isEmpty()) {
      int size = queue.size();
      List<Integer> level = new ArrayList<>();
      for (int i = 0; i < size; i++) {
        TreeNode node = queue.poll();
        level.add(node.val);
        if (node.left != null) queue.add(node.left);
        if (node.right != null) queue.add(node.right);
      }
      result.add(level);
    }
    return result;
  }
}
`}</pre>
      </div>

      <div className="console" role="status" aria-live="polite">Console: <span style={{marginLeft:8}}>Memory 42.5 MB</span></div>
    </>
  );
}