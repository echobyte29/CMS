import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, User, Mail, Building, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Mock data type
type Member = {
  id: string;
  name: string;
  email: string;
  branch: string;
  year: number;
  role: string;
  registrationDate: string;
};

// Mock data
const mockMembers: Member[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    branch: "CSE",
    year: 3,
    role: "Member",
    registrationDate: "2024-03-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    branch: "IT",
    year: 2,
    role: "Core Member",
    registrationDate: "2024-03-14",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    branch: "ECE",
    year: 4,
    role: "Member",
    registrationDate: "2024-03-13",
  },
];

const branches = ["All", "CSE", "IT", "ECE"];
const years = ["All", "1", "2", "3", "4"];
const roles = ["All", "Member", "Core Member", "Executive"];

export default function RegisteredMembers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");

  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBranch = selectedBranch === "All" || member.branch === selectedBranch;
    const matchesYear = selectedYear === "All" || member.year.toString() === selectedYear;
    const matchesRole = selectedRole === "All" || member.role === selectedRole;

    return matchesSearch && matchesBranch && matchesYear && matchesRole;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBranch("All");
    setSelectedYear("All");
    setSelectedRole("All");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Registered Members</h1>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-[180px]">
              <Building className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[180px]">
              <User className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={clearFilters}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Registration Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No members found
                  </TableCell>
                </TableRow>
              ) : (
                filteredMembers.map((member) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        {member.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {member.email}
                      </div>
                    </TableCell>
                    <TableCell>{member.branch}</TableCell>
                    <TableCell>{member.year}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>{member.registrationDate}</TableCell>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 