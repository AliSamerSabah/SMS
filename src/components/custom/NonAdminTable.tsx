import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTableContext } from '@/hooks/useTableContext';
import { useTableHelpers } from '@/hooks/useTableHelpers';
export default function NonAdminTable() {
  const {
    data: {
      data
    }
  } = useTableContext()
  const { isExempted  } = useTableHelpers()
  return (
    <div className="flex items-center flex-col min-h-screen pt-20 ">
      <Card className="w-300">
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>A list of this class' students </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of this class' students.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Total Absents</TableHead>
                <TableHead className="text-right">General Exemption Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((student, i) => {
                const { exemptionStatus } = isExempted(student)
                const text = exemptionStatus === "incomplete" ? "Data Incomplete"
                  : exemptionStatus === false ? "Not Exempted" : "Exempted"
                return (
                <TableRow key={i}>
                  <TableCell>{student.personalInfo.name}</TableCell>
                  <TableCell>{student.totalAbsences}</TableCell>
                  <TableCell className="text-right">{text}</TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
