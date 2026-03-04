import { useEffect, useState } from "react";
import { MoreWebsiteService } from "@/services/morewebsite/morewebsite.service";

export function useDetailWebsiteRoom(webId: string) {
  const [detailWebsite, setDetailWebsite] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!webId) {
      console.error("didn't get webId");
      setLoading(false);
      return;
    }
    
    console.log("fetching website detail for ID: ", webId);

    const fetchDetailWebsite = async () => {
      const data = await MoreWebsiteService.getWebsiteById(webId);
      if (data) setDetailWebsite(data);
      setLoading(false);
    }

    fetchDetailWebsite();
  }, [webId]);
  
  return { detailWebsite, loading };
};