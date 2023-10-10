import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { trpc } from '../lib/trpc';

// enum ReportStatus {
//   PENDING = "PENDING",
//   REJECTED = "REJECTED",
//   APPROVED = "APPROVED",
// }

interface ReportContextType {
  latitude: number;
  longitude: number;
  status: string;
  id: number;
  timestamp: string;
}

const NearbyReportsContext = createContext<ReportContextType[] | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useReports() {
  const context = useContext(NearbyReportsContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a NearbyReportsProvider');
  }
  return context;
}

interface ReportsProviderProps {
  children: ReactNode;
}

export function NearbyReportsProvider({ children }: ReportsProviderProps) {
  const {data} = trpc.report.all.useQuery();

  const initialReports: ReportContextType[] = []; // Initialize as an empty array

  const [reports, setReports] = useState<ReportContextType[]>(initialReports);

  useEffect(() => {
    if (data) {
      const transformedData = data.map((report) => ({
        latitude: report.latitude,
        longitude: report.longitude,
        status: report.status,
        id: report.id,
        timestamp: report.timestamp,
      }));

      setReports(transformedData);
    }
  }, [data]);

  return (
    <NearbyReportsContext.Provider value={reports}>
      {children}
    </NearbyReportsContext.Provider>
  );
}
