import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  BarChart3, 
  Calendar, 
  ChevronRight, 
  Download, 
  Filter, 
  Loader2, 
  Mail, 
  RefreshCw, 
  School, 
  Search, 
  TrendingUp, 
  User, 
  Users, 
  X 
} from "lucide-react"
import { motion } from "framer-motion"
import { AdminLayout } from "@/components/AdminLayout"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Member {
  id: string
  name: string
  rollNumber: string
  email: string
  status: "approved" | "pending" | "rejected"
  joinedDate: string
  department?: string
  year?: string
  avatar?: string
  lastActive?: string
}

export default function ViewMembers() {
  const [members, setMembers] = useState<Member[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending">("approved")
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0
  })
  const [isApproving, setIsApproving] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 10
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [memberDialogOpen, setMemberDialogOpen] = useState(false)
  const [approveDialogOpen, setApproveDialogOpen] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  // Mock data
  const mockMembers: Member[] = [
    {
      id: "1",
      name: "John Doe",
      rollNumber: "KLH2024001",
      email: "john@example.com",
      status: "approved",
      joinedDate: "2024-01-01",
      department: "Computer Science",
      year: "3rd Year",
      avatar: "JD",
      lastActive: "2 hours ago"
    },
    {
      id: "2",
      name: "Jane Smith",
      rollNumber: "KLH2024002",
      email: "jane@example.com",
      status: "pending",
      joinedDate: "2024-01-15",
      department: "Electrical Engineering",
      year: "2nd Year",
      avatar: "JS",
      lastActive: "1 day ago"
    },
    {
      id: "3",
      name: "Alex Johnson",
      rollNumber: "KLH2024003",
      email: "alex@example.com",
      status: "approved",
      joinedDate: "2024-02-05",
      department: "Mechanical Engineering",
      year: "4th Year",
      avatar: "AJ",
      lastActive: "Just now"
    },
    {
      id: "4",
      name: "Sarah Williams",
      rollNumber: "KLH2024004",
      email: "sarah@example.com",
      status: "approved",
      joinedDate: "2024-02-10",
      department: "Computer Science",
      year: "1st Year",
      avatar: "SW",
      lastActive: "3 days ago"
    },
    {
      id: "5",
      name: "Michael Brown",
      rollNumber: "KLH2024005",
      email: "michael@example.com", 
      status: "pending",
      joinedDate: "2024-02-15",
      department: "Information Technology",
      year: "2nd Year",
      avatar: "MB",
      lastActive: "1 week ago"
    },
    {
      id: "6",
      name: "Emily Davis",
      rollNumber: "KLH2024006",
      email: "emily@example.com",
      status: "approved",
      joinedDate: "2024-02-20",
      department: "Computer Science",
      year: "3rd Year",
      avatar: "ED",
      lastActive: "5 hours ago"
    }
  ];

  const fetchMembers = () => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setMembers(mockMembers);
      
      // Calculate stats
      const total = mockMembers.length;
      const approved = mockMembers.filter(m => m.status === "approved").length;
      const pending = mockMembers.filter(m => m.status === "pending").length;
      
      setStats({
        total,
        approved,
        pending
      });
      
      // Calculate pagination
      setTotalPages(Math.ceil(total / pageSize));
      
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Filter members based on status filter
  const statusFilteredMembers = statusFilter === "all" 
    ? members 
    : members.filter(member => member.status === statusFilter);
  
  // Then apply search filter
  const filteredMembers = statusFilteredMembers.filter(
    (member) =>
      searchQuery === "" || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.year?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedMembers(checked ? paginatedMembers.map(m => m.id) : []);
  };
  
  const handleSelectMember = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedMembers(prev => [...prev, id]);
    } else {
      setSelectedMembers(prev => prev.filter(memberId => memberId !== id));
    }
  };

  const handleApprove = (id: string) => {
    setIsApproving(id);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Update the member status locally
      setMembers(prevMembers =>
        prevMembers.map(member =>
          member.id === id ? { ...member, status: "approved" } : member
        )
      );
      
      // Update stats
      setStats(prev => ({
        ...prev,
        approved: prev.approved + 1,
        pending: prev.pending - 1
      }));
      
      toast({
        title: "Member approved",
        description: "The member has been successfully approved.",
      });
      
      setIsApproving(null);
    }, 600);
  };
  
  const handleBulkApprove = () => {
    // Filter only pending members from selection
    const pendingSelected = selectedMembers.filter(id => 
      members.find(m => m.id === id)?.status === "pending"
    );
    
    if (pendingSelected.length === 0) {
      toast({
        title: "No pending members selected",
        description: "Please select at least one pending member to approve.",
        variant: "destructive"
      });
      return;
    }
    
    // Update all selected pending members
    setMembers(prevMembers =>
      prevMembers.map(member =>
        pendingSelected.includes(member.id) ? { ...member, status: "approved" } : member
      )
    );
    
    // Update stats
    setStats(prev => ({
      ...prev,
      approved: prev.approved + pendingSelected.length,
      pending: prev.pending - pendingSelected.length
    }));
    
    toast({
      title: "Members approved",
      description: `Successfully approved ${pendingSelected.length} members.`,
    });
    
    // Clear selection
    setSelectedMembers([]);
    setSelectAll(false);
  };

  const handleExport = (format: 'csv' | 'excel' = 'csv') => {
    // In a real implementation, this would download actual data
    // For now, just show a toast message
    toast({
      title: "Export initiated",
      description: `Exporting ${selectedMembers.length > 0 ? 'selected' : 'all'} members as ${format.toUpperCase()}.`,
    });
  };

  const handleRefresh = () => {
    fetchMembers();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Reset selection when page changes
    setSelectedMembers([]);
    setSelectAll(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const viewMemberDetails = (member: Member) => {
    setSelectedMember(member);
    setMemberDialogOpen(true);
  };

  const prepareForApproval = (member: Member) => {
    setSelectedMember(member);
    setApproveDialogOpen(true);
  };

  const confirmApproval = () => {
    if (!selectedMember) return;
    
    handleApprove(selectedMember.id);
    setApproveDialogOpen(false);
  };

  return (
    <AdminLayout>
      <motion.div 
        className="space-y-6 px-1 py-2"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header with statistics */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="border-0 hover:shadow-xl transition-all duration-300 shadow-md rounded-xl overflow-hidden relative group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="p-6 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl shadow-sm group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold mt-1 text-blue-500 group-hover:scale-110 transition-transform">{stats.total}</h3>
                      <span className="text-xs text-muted-foreground">active</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500 font-medium group-hover:scale-110 transition-transform">+12%</span>
                  </div>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </div>
              <Separator className="my-2 opacity-50" />
              <div className="pt-2 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Updated today</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-xs hover:bg-blue-500/5 -mr-2 group-hover:bg-blue-500/10 transition-colors"
                  onClick={() => setStatusFilter("all")}
                >
                  View All
                </Button>
              </div>
            </div>
          </Card>

          <Card className="border-0 hover:shadow-xl transition-all duration-300 shadow-md rounded-xl overflow-hidden relative group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-green-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="p-6 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-xl shadow-sm group-hover:scale-110 group-hover:bg-green-500/20 transition-all duration-300">
                    <Calendar className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Approved Members</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold mt-1 text-green-500 group-hover:scale-110 transition-transform">{stats.approved}</h3>
                      <span className="text-xs text-muted-foreground">active</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500/20 shadow-sm bg-green-500/5 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                  Active
                </Badge>
              </div>
              <Separator className="my-2 opacity-50" />
              <div className="pt-2 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Last approved 2 days ago</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-xs hover:bg-green-500/5 -mr-2 group-hover:bg-green-500/10 transition-colors"
                  onClick={() => setStatusFilter("approved")}
                >
                  View All
                </Button>
              </div>
            </div>
          </Card>

          <Card className="border-0 hover:shadow-xl transition-all duration-300 shadow-md rounded-xl overflow-hidden relative group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="p-6 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-xl shadow-sm group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
                    <BarChart3 className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Members</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold mt-1 text-amber-500 group-hover:scale-110 transition-transform">{stats.pending}</h3>
                      <span className="text-xs text-muted-foreground">requests</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-amber-500 border-amber-500/20 shadow-sm bg-amber-500/5 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  Pending
                </Badge>
              </div>
              <Separator className="my-2 opacity-50" />
              <div className="pt-2 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Requires review</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-xs hover:bg-amber-500/5 -mr-2 group-hover:bg-amber-500/10 transition-colors"
                  onClick={() => setStatusFilter("pending")}
                >
                  View All
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-primary/80 to-purple-600"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Member Directory</h1>
              <p className="text-muted-foreground mt-1">Manage and view details of all KLH university members</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-4 h-10 rounded-lg border-border bg-background/50 backdrop-blur-sm focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                />
              </div>
              
              <Tabs defaultValue="approved" className="w-auto border rounded-lg overflow-hidden">
                <TabsList className="bg-muted/50 backdrop-blur-sm h-10 p-0.5 grid w-full grid-cols-3">
                  <TabsTrigger 
                    value="all" 
                    onClick={() => setStatusFilter("all")}
                    className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded px-3 py-1.5 text-sm"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="approved" 
                    onClick={() => setStatusFilter("approved")}
                    className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded px-3 py-1.5 text-sm"
                  >
                    Approved
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pending" 
                    onClick={() => setStatusFilter("pending")}
                    className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded px-3 py-1.5 text-sm"
                  >
                    Pending
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10 rounded-lg border-border bg-background/50 backdrop-blur-sm"
                onClick={handleRefresh}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-10 w-10 rounded-lg border-border bg-background/50 backdrop-blur-sm"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleExport('csv')}>
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('excel')}>
                    Export as Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Bulk Action Bar (only visible when items are selected) */}
          {selectedMembers.length > 0 && (
            <div className="mb-4 p-2 bg-primary/5 rounded-lg border border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{selectedMembers.length} members selected</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedMembers([])}
                >
                  Clear Selection
                </Button>
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={handleBulkApprove}
                >
                  Approve Selected
                </Button>
              </div>
            </div>
          )}

          <div className="rounded-lg border overflow-hidden bg-background/50 backdrop-blur-sm shadow-sm">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-muted/30">
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={paginatedMembers.length > 0 && selectAll}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-[250px]">Name</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead className="hidden md:table-cell">Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Joined Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Loader2 className="h-8 w-8 text-primary mb-2 animate-spin" />
                        <p className="text-muted-foreground">Loading member data...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
                        <p className="text-muted-foreground">No members found matching your search criteria</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedMembers.map((member) => (
                    <TableRow key={member.id} className="group hover:bg-muted/20 transition-colors">
                      <TableCell>
                        <Checkbox 
                          checked={selectedMembers.includes(member.id)}
                          onCheckedChange={(checked) => 
                            handleSelectMember(member.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm transition-all group-hover:scale-110 duration-300">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{member.rollNumber}</TableCell>
                      <TableCell className="hidden md:table-cell">{member.department}</TableCell>
                      <TableCell className="hidden md:table-cell">{member.year}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${
                            member.status === "approved" 
                              ? "bg-green-500/10 text-green-500 border-green-500/20" 
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          } transition-all group-hover:bg-background/50`}
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{member.joinedDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {member.status === "pending" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500 hover:text-white transition-colors"
                              onClick={() => prepareForApproval(member)}
                              disabled={isApproving === member.id}
                            >
                              {isApproving === member.id ? (
                                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                              ) : null}
                              Approve
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-full hover:bg-primary/10"
                            onClick={() => viewMemberDetails(member)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{paginatedMembers.length}</span> of{" "}
              <span className="font-medium">{filteredMembers.length}</span> members
            </p>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-3"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              {/* Dynamic page buttons */}
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                // Determine which page numbers to show
                let pageNum = i + 1;
                if (currentPage > 2 && totalPages > 3) {
                  if (i === 0) pageNum = currentPage - 1;
                  if (i === 1) pageNum = currentPage;
                  if (i === 2) pageNum = currentPage + 1;
                }
                
                // Don't show page numbers beyond the total
                if (pageNum > totalPages) return null;
                
                return (
                  <Button 
                    key={i}
                    variant="outline" 
                    size="sm" 
                    className={`h-8 w-8 p-0 ${currentPage === pageNum ? 'bg-primary/10 border-primary/20' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-3"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Add this after the component's main returned JSX */}

        <Dialog open={memberDialogOpen} onOpenChange={setMemberDialogOpen}>
          <DialogContent className="max-w-2xl">
            {selectedMember && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-lg mr-3">
                      {selectedMember.avatar}
                    </div>
                    Member Details
                  </DialogTitle>
                  <DialogDescription>
                    Complete information about the selected member
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-4">
                  <div className="lg:col-span-1 flex flex-col items-center">
                    <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-4xl mb-4">
                      {selectedMember.avatar}
                    </div>
                    
                    <h3 className="text-lg font-medium text-center">{selectedMember.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedMember.rollNumber}</p>
                    
                    <Badge
                      variant="outline"
                      className={`mt-3 ${
                        selectedMember.status === "approved" 
                          ? "bg-green-500/10 text-green-500 border-green-500/20" 
                          : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}
                    >
                      {selectedMember.status}
                    </Badge>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border border-border">
                          <CardContent className="pt-6">
                            <div className="flex items-start">
                              <User className="h-5 w-5 text-primary mr-2 mt-0.5" />
                              <div>
                                <h4 className="text-sm font-medium">Name</h4>
                                <p className="text-sm text-muted-foreground">{selectedMember.name}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border border-border">
                          <CardContent className="pt-6">
                            <div className="flex items-start">
                              <Mail className="h-5 w-5 text-primary mr-2 mt-0.5" />
                              <div>
                                <h4 className="text-sm font-medium">Email</h4>
                                <p className="text-sm text-muted-foreground">{selectedMember.email}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border border-border">
                          <CardContent className="pt-6">
                            <div className="flex items-start">
                              <School className="h-5 w-5 text-primary mr-2 mt-0.5" />
                              <div>
                                <h4 className="text-sm font-medium">Department</h4>
                                <p className="text-sm text-muted-foreground">{selectedMember.department || "Not specified"}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border border-border">
                          <CardContent className="pt-6">
                            <div className="flex items-start">
                              <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5" />
                              <div>
                                <h4 className="text-sm font-medium">Year</h4>
                                <p className="text-sm text-muted-foreground">{selectedMember.year || "Not specified"}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <Card className="border border-border">
                        <CardContent className="pt-6">
                          <div className="flex flex-col space-y-3">
                            <div className="flex items-start">
                              <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5" />
                              <div>
                                <h4 className="text-sm font-medium">Joined Date</h4>
                                <p className="text-sm text-muted-foreground">{selectedMember.joinedDate}</p>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-start">
                              <TrendingUp className="h-5 w-5 text-primary mr-2 mt-0.5" />
                              <div>
                                <h4 className="text-sm font-medium">Activity Status</h4>
                                <p className="text-sm text-muted-foreground">Last active {selectedMember.lastActive}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
                
                <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
                  <div>
                    {selectedMember.status === "pending" && (
                      <Button 
                        onClick={() => {
                          setMemberDialogOpen(false);
                          prepareForApproval(selectedMember);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        Approve Member
                      </Button>
                    )}
                  </div>
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog for Member Approval */}
        <AlertDialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to approve {selectedMember?.name} as a member. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmApproval} className="bg-green-500 hover:bg-green-600">
                {isApproving === selectedMember?.id ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Approve
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
    </AdminLayout>
  )
}