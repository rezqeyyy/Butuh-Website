import { useEffect, useState, useRef } from "react";
import { MoreWebsiteService } from "@/services/morewebsite/morewebsite.service";

export function useMoreWebsite() {
  const [moreWebsite, setMoreWebsite] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchWebsite = async () => {
      setLoading(true);
      const data = await MoreWebsiteService.getAllWebsite();
      if (data) setMoreWebsite(data);
      setLoading(false);
    }

    fetchWebsite();
  }, []);
  
  return { moreWebsite, loading };
};