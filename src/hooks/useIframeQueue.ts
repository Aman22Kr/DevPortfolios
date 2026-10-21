import { useEffect, useState } from 'react';

// Maximum concurrent iframes in the DOM as specified in the requirements (4-6)
const MAX_CONCURRENT_IFRAMES = 5;

type SlotCallback = (granted: boolean) => void;

class IframeQueueManager {
  private activeSlots = new Set<string>();
  private waitingQueue: { id: string; callback: SlotCallback }[] = [];

  requestSlot(id: string, callback: SlotCallback): () => void {
    if (this.activeSlots.has(id)) {
      callback(true);
      return () => this.releaseSlot(id);
    }

    if (this.activeSlots.size < MAX_CONCURRENT_IFRAMES) {
      this.activeSlots.add(id);
      callback(true);
    } else {
      // Enqueue
      this.waitingQueue.push({ id, callback });
    }

    return () => this.releaseSlot(id);
  }

  releaseSlot(id: string) {
    if (this.activeSlots.has(id)) {
      this.activeSlots.delete(id);
      // Promote next from queue
      if (this.waitingQueue.length > 0) {
        const next = this.waitingQueue.shift();
        if (next) {
          this.activeSlots.add(next.id);
          next.callback(true);
        }
      }
    } else {
      // Remove from waiting queue if still pending
      this.waitingQueue = this.waitingQueue.filter((item) => item.id !== id);
    }
  }

  getActiveCount(): number {
    return this.activeSlots.size;
  }
}

export const iframeQueue = new IframeQueueManager();

export function useIframeQueueSlot(id: string, isVisible: boolean) {
  const [canLoadIframe, setCanLoadIframe] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setCanLoadIframe(false);
      iframeQueue.releaseSlot(id);
      return;
    }

    const cleanup = iframeQueue.requestSlot(id, (granted) => {
      setCanLoadIframe(granted);
    });

    return () => {
      cleanup();
    };
  }, [id, isVisible]);

  return canLoadIframe;
}
