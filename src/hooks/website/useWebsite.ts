import { useEffect, useState } from "react";
import { MoreWebsiteService } from "@/services/morewebsite/morewebsite.service";

export function useWebsite() {
  const [website, setWebsite] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchWebsite = async () => {
      const data = await MoreWebsiteService.getAllWebsite();
      if (data) setWebsite(data.slice(0, 3));
      setLoading(false);
    }

    fetchWebsite();
  }, []);
  
  return { website, loading };
};