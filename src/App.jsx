import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard, Calendar, Users, Bell, FileText, Settings, LogOut, Plus, Search,
  Filter, Clock, MapPin, User, Mail, Phone, ChevronRight, X, Check, AlertCircle,
  Camera, Video, ExternalLink, MessageSquare, BarChart3, ChevronDown, Send, Menu,
  Building2, GraduationCap, Hammer, Briefcase, ShieldCheck, UserCog
} from 'lucide-react';

// ============================================================================
// SAMPLE DATA
// ============================================================================

const ROLES = {
  SUPER_ADMIN: { id: 'super_admin', name: 'IT-super admin', label: 'Controller', icon: ShieldCheck, color: 'teal' },
  HR: { id: 'hr', name: 'Department HR', label: 'HR Manager', icon: UserCog, color: 'blue' },
  HOD: { id: 'hod', name: 'Department Head', label: 'HoD / FH', icon: Briefcase, color: 'indigo' },
  INSTRUCTOR: { id: 'instructor', name: 'Instructor', label: 'Trainer', icon: GraduationCap, color: 'amber' },
  EMPLOYEE: { id: 'employee', name: 'Employee', label: 'Staff Member', icon: User, color: 'slate' },
  LABOUR: { id: 'labour', name: 'Labour', label: 'Worker', icon: Hammer, color: 'orange' }
};

const CURRENT_USERS = {
  super_admin: { name: 'Rajesh Kumar', empId: 'UTC-1001', dept: 'Central Training Cell', designation: 'Training Controller', email: 'rajesh.k@ultratech.com', phone: '+91 98765 43210' },
  hr: { name: 'Priya Sharma', empId: 'UTC-2045', dept: 'Production', designation: 'HR Manager', email: 'priya.s@ultratech.com', phone: '+91 98765 43211' },
  hod: { name: 'Suresh Iyer', empId: 'UTC-1502', dept: 'Mechanical Maintenance', designation: 'Head of Department', email: 'suresh.i@ultratech.com', phone: '+91 98765 43212' },
  instructor: { name: 'Anjali Verma', empId: 'UTC-3021', dept: 'Safety & Training', designation: 'Senior Safety Trainer', email: 'anjali.v@ultratech.com', phone: '+91 98765 43213' },
  employee: { name: 'Vikram Singh', empId: 'UTC-4502', dept: 'Quality Control', designation: 'QC Engineer', email: 'vikram.s@ultratech.com', phone: '+91 98765 43214' },
  labour: { name: 'Ramesh Yadav', empId: 'UTC-L-7821', dept: 'Packing Plant', designation: 'Packing Operator', email: '-', phone: '+91 87654 32109' }
};

const DEPARTMENTS = [
  'Production', 'Mechanical Maintenance', 'Electrical Maintenance', 'Quality Control',
  'Safety & Training', 'Packing Plant', 'Mines', 'Stores & Logistics', 'Civil', 'IT'
];

const WORKFORCE = [
  { id: 1, empId: 'UTC-4001', name: 'Sunil Singh', dept: 'Production', designation: 'Supervisor', type: 'employee', shift: 'A', phone: '+91 9859657103', email: 'sunil.s@ultratech.com' },
  { id: 2, empId: 'UTC-4002', name: 'Dinesh Joshi', dept: 'Production', designation: 'Supervisor', type: 'employee', shift: 'A', phone: '+91 9412977952', email: 'dinesh.j@ultratech.com' },
  { id: 3, empId: 'UTC-4003', name: 'Dinesh Iyer', dept: 'Production', designation: 'Process Operator', type: 'employee', shift: 'C', phone: '+91 9834811805', email: 'dinesh.i@ultratech.com' },
  { id: 4, empId: 'UTC-4004', name: 'Mohan Sharma', dept: 'Production', designation: 'Shift Engineer', type: 'employee', shift: 'B', phone: '+91 9768351140', email: 'mohan.s@ultratech.com' },
  { id: 5, empId: 'UTC-4005', name: 'Sneha Das', dept: 'Production', designation: 'Supervisor', type: 'employee', shift: 'General', phone: '+91 9383740009', email: 'sneha.d@ultratech.com' },
  { id: 6, empId: 'UTC-4006', name: 'Nisha Reddy', dept: 'Production', designation: 'Production Manager', type: 'employee', shift: 'B', phone: '+91 9720619240', email: 'nisha.r@ultratech.com' },
  { id: 7, empId: 'UTC-4007', name: 'Ramesh Chauhan', dept: 'Production', designation: 'Shift Engineer', type: 'employee', shift: 'B', phone: '+91 9929732064', email: 'ramesh.c@ultratech.com' },
  { id: 8, empId: 'UTC-4008', name: 'Rakesh Patel', dept: 'Production', designation: 'Shift Engineer', type: 'employee', shift: 'A', phone: '+91 9398086884', email: 'rakesh.p@ultratech.com' },
  { id: 9, empId: 'UTC-4009', name: 'Vikram Singh', dept: 'Production', designation: 'Supervisor', type: 'employee', shift: 'A', phone: '+91 9304388909', email: 'vikram.s@ultratech.com' },
  { id: 10, empId: 'UTC-4010', name: 'Kavita Chauhan', dept: 'Production', designation: 'Supervisor', type: 'employee', shift: 'C', phone: '+91 9671071660', email: 'kavita.c@ultratech.com' },
  { id: 11, empId: 'UTC-L-7011', name: 'Vikram Singh', dept: 'Production', designation: 'Helper', type: 'labour', shift: 'B', phone: '+91 8208716530', email: '-' },
  { id: 12, empId: 'UTC-L-7012', name: 'Anita Sharma', dept: 'Production', designation: 'Machine Operator', type: 'labour', shift: 'A', phone: '+91 8756817795', email: '-' },
  { id: 13, empId: 'UTC-L-7013', name: 'Amit Reddy', dept: 'Production', designation: 'Cleaner', type: 'labour', shift: 'C', phone: '+91 8570113522', email: '-' },
  { id: 14, empId: 'UTC-L-7014', name: 'Anita Joshi', dept: 'Production', designation: 'Cleaner', type: 'labour', shift: 'B', phone: '+91 8884092829', email: '-' },
  { id: 15, empId: 'UTC-L-7015', name: 'Anita Patel', dept: 'Production', designation: 'Machine Operator', type: 'labour', shift: 'B', phone: '+91 8579738874', email: '-' },
  { id: 16, empId: 'UTC-L-7016', name: 'Pooja Iyer', dept: 'Production', designation: 'Cleaner', type: 'labour', shift: 'C', phone: '+91 8248747198', email: '-' },
  { id: 17, empId: 'UTC-L-7017', name: 'Swati Rao', dept: 'Production', designation: 'Cleaner', type: 'labour', shift: 'C', phone: '+91 8781400389', email: '-' },
  { id: 18, empId: 'UTC-L-7018', name: 'Rahul Patel', dept: 'Production', designation: 'Cleaner', type: 'labour', shift: 'A', phone: '+91 8429839588', email: '-' },
  { id: 19, empId: 'UTC-L-7019', name: 'Manoj Rao', dept: 'Production', designation: 'Helper', type: 'labour', shift: 'General', phone: '+91 8296271216', email: '-' },
  { id: 20, empId: 'UTC-L-7020', name: 'Swati Sharma', dept: 'Production', designation: 'Machine Operator', type: 'labour', shift: 'General', phone: '+91 8426314735', email: '-' },
  { id: 21, empId: 'UTC-4021', name: 'Raj Iyer', dept: 'Mechanical Maintenance', designation: 'Fitter', type: 'employee', shift: 'C', phone: '+91 9736161605', email: 'raj.i@ultratech.com' },
  { id: 22, empId: 'UTC-4022', name: 'Pooja Joshi', dept: 'Mechanical Maintenance', designation: 'Maintenance Engineer', type: 'employee', shift: 'General', phone: '+91 9858418522', email: 'pooja.j@ultratech.com' },
  { id: 23, empId: 'UTC-4023', name: 'Ramesh Sharma', dept: 'Mechanical Maintenance', designation: 'Fitter', type: 'employee', shift: 'C', phone: '+91 9646426155', email: 'ramesh.s@ultratech.com' },
  { id: 24, empId: 'UTC-4024', name: 'Pooja Chauhan', dept: 'Mechanical Maintenance', designation: 'Supervisor', type: 'employee', shift: 'C', phone: '+91 9732812036', email: 'pooja.c@ultratech.com' },
  { id: 25, empId: 'UTC-4025', name: 'Dinesh Yadav', dept: 'Mechanical Maintenance', designation: 'Technician', type: 'employee', shift: 'A', phone: '+91 9760689632', email: 'dinesh.y@ultratech.com' },
  { id: 26, empId: 'UTC-4026', name: 'Pooja Rao', dept: 'Mechanical Maintenance', designation: 'Supervisor', type: 'employee', shift: 'A', phone: '+91 9593604357', email: 'pooja.r@ultratech.com' },
  { id: 27, empId: 'UTC-4027', name: 'Pooja Das', dept: 'Mechanical Maintenance', designation: 'Fitter', type: 'employee', shift: 'C', phone: '+91 9695610889', email: 'pooja.d@ultratech.com' },
  { id: 28, empId: 'UTC-4028', name: 'Suresh Das', dept: 'Mechanical Maintenance', designation: 'Supervisor', type: 'employee', shift: 'C', phone: '+91 9985067381', email: 'suresh.d@ultratech.com' },
  { id: 29, empId: 'UTC-4029', name: 'Sneha Sharma', dept: 'Mechanical Maintenance', designation: 'Maintenance Engineer', type: 'employee', shift: 'C', phone: '+91 9460764370', email: 'sneha.s@ultratech.com' },
  { id: 30, empId: 'UTC-4030', name: 'Mohan Yadav', dept: 'Mechanical Maintenance', designation: 'Fitter', type: 'employee', shift: 'A', phone: '+91 9724693390', email: 'mohan.y@ultratech.com' },
  { id: 31, empId: 'UTC-L-7031', name: 'Geeta Nair', dept: 'Mechanical Maintenance', designation: 'Helper', type: 'labour', shift: 'C', phone: '+91 8153649338', email: '-' },
  { id: 32, empId: 'UTC-L-7032', name: 'Mohan Nair', dept: 'Mechanical Maintenance', designation: 'Assistant Fitter', type: 'labour', shift: 'B', phone: '+91 8725156961', email: '-' },
  { id: 33, empId: 'UTC-L-7033', name: 'Raj Mishra', dept: 'Mechanical Maintenance', designation: 'Helper', type: 'labour', shift: 'B', phone: '+91 8917253604', email: '-' },
  { id: 34, empId: 'UTC-L-7034', name: 'Amit Mishra', dept: 'Mechanical Maintenance', designation: 'Helper', type: 'labour', shift: 'B', phone: '+91 8679931660', email: '-' },
  { id: 35, empId: 'UTC-L-7035', name: 'Pooja Sharma', dept: 'Mechanical Maintenance', designation: 'Assistant Fitter', type: 'labour', shift: 'B', phone: '+91 8376617271', email: '-' },
  { id: 36, empId: 'UTC-L-7036', name: 'Sneha Iyer', dept: 'Mechanical Maintenance', designation: 'Helper', type: 'labour', shift: 'General', phone: '+91 8373474229', email: '-' },
  { id: 37, empId: 'UTC-L-7037', name: 'Rakesh Mishra', dept: 'Mechanical Maintenance', designation: 'Assistant Fitter', type: 'labour', shift: 'General', phone: '+91 8375866190', email: '-' },
  { id: 38, empId: 'UTC-L-7038', name: 'Ramesh Chauhan', dept: 'Mechanical Maintenance', designation: 'Helper', type: 'labour', shift: 'C', phone: '+91 8542167978', email: '-' },
  { id: 39, empId: 'UTC-L-7039', name: 'Mahesh Joshi', dept: 'Mechanical Maintenance', designation: 'Welder', type: 'labour', shift: 'C', phone: '+91 8426056201', email: '-' },
  { id: 40, empId: 'UTC-L-7040', name: 'Anita Singh', dept: 'Mechanical Maintenance', designation: 'Welder', type: 'labour', shift: 'B', phone: '+91 8928421164', email: '-' },
  { id: 41, empId: 'UTC-4041', name: 'Rakesh Iyer', dept: 'Electrical Maintenance', designation: 'Electrical Engineer', type: 'employee', shift: 'A', phone: '+91 9648344587', email: 'rakesh.i@ultratech.com' },
  { id: 42, empId: 'UTC-4042', name: 'Sanjay Singh', dept: 'Electrical Maintenance', designation: 'Supervisor', type: 'employee', shift: 'B', phone: '+91 9518130538', email: 'sanjay.s@ultratech.com' },
  { id: 43, empId: 'UTC-4043', name: 'Dinesh Singh', dept: 'Electrical Maintenance', designation: 'Electrician', type: 'employee', shift: 'A', phone: '+91 9276735703', email: 'dinesh.s@ultratech.com' },
  { id: 44, empId: 'UTC-4044', name: 'Swati Rao', dept: 'Electrical Maintenance', designation: 'Electrician', type: 'employee', shift: 'C', phone: '+91 9459541404', email: 'swati.r@ultratech.com' },
  { id: 45, empId: 'UTC-4045', name: 'Sanjay Mishra', dept: 'Electrical Maintenance', designation: 'Supervisor', type: 'employee', shift: 'A', phone: '+91 9112740567', email: 'sanjay.m@ultratech.com' },
  { id: 46, empId: 'UTC-4046', name: 'Swati Das', dept: 'Electrical Maintenance', designation: 'Instrument Tech', type: 'employee', shift: 'General', phone: '+91 9440649106', email: 'swati.d@ultratech.com' },
  { id: 47, empId: 'UTC-4047', name: 'Priya Kumar', dept: 'Electrical Maintenance', designation: 'Electrical Engineer', type: 'employee', shift: 'C', phone: '+91 9742314420', email: 'priya.k@ultratech.com' },
  { id: 48, empId: 'UTC-4048', name: 'Nisha Verma', dept: 'Electrical Maintenance', designation: 'Electrical Engineer', type: 'employee', shift: 'C', phone: '+91 9266055641', email: 'nisha.v@ultratech.com' },
  { id: 49, empId: 'UTC-4049', name: 'Sunil Reddy', dept: 'Electrical Maintenance', designation: 'Instrument Tech', type: 'employee', shift: 'General', phone: '+91 9478623504', email: 'sunil.r@ultratech.com' },
  { id: 50, empId: 'UTC-4050', name: 'Manoj Patel', dept: 'Electrical Maintenance', designation: 'Instrument Tech', type: 'employee', shift: 'A', phone: '+91 9967516734', email: 'manoj.p@ultratech.com' },
  { id: 51, empId: 'UTC-L-7051', name: 'Ramesh Gupta', dept: 'Electrical Maintenance', designation: 'Wireman', type: 'labour', shift: 'B', phone: '+91 8192370366', email: '-' },
  { id: 52, empId: 'UTC-L-7052', name: 'Deepak Gupta', dept: 'Electrical Maintenance', designation: 'Helper', type: 'labour', shift: 'B', phone: '+91 8298238644', email: '-' },
  { id: 53, empId: 'UTC-L-7053', name: 'Deepak Yadav', dept: 'Electrical Maintenance', designation: 'Helper', type: 'labour', shift: 'B', phone: '+91 8765714040', email: '-' },
  { id: 54, empId: 'UTC-L-7054', name: 'Raj Yadav', dept: 'Electrical Maintenance', designation: 'Helper', type: 'labour', shift: 'C', phone: '+91 8907104842', email: '-' },
  { id: 55, empId: 'UTC-L-7055', name: 'Kavita Singh', dept: 'Electrical Maintenance', designation: 'Wireman', type: 'labour', shift: 'B', phone: '+91 8437928542', email: '-' },
  { id: 56, empId: 'UTC-L-7056', name: 'Rakesh Singh', dept: 'Electrical Maintenance', designation: 'Helper', type: 'labour', shift: 'A', phone: '+91 8398618096', email: '-' },
  { id: 57, empId: 'UTC-L-7057', name: 'Mohan Sharma', dept: 'Electrical Maintenance', designation: 'Wireman', type: 'labour', shift: 'C', phone: '+91 8124046771', email: '-' },
  { id: 58, empId: 'UTC-L-7058', name: 'Priya Das', dept: 'Electrical Maintenance', designation: 'Wireman', type: 'labour', shift: 'A', phone: '+91 8339065669', email: '-' },
  { id: 59, empId: 'UTC-L-7059', name: 'Arjun Iyer', dept: 'Electrical Maintenance', designation: 'Helper', type: 'labour', shift: 'A', phone: '+91 8412070370', email: '-' },
  { id: 60, empId: 'UTC-L-7060', name: 'Deepak Chauhan', dept: 'Electrical Maintenance', designation: 'Assistant Electrician', type: 'labour', shift: 'General', phone: '+91 8381077285', email: '-' },
  { id: 61, empId: 'UTC-4061', name: 'Swati Chauhan', dept: 'Quality Control', designation: 'Quality Manager', type: 'employee', shift: 'C', phone: '+91 9843133354', email: 'swati.c@ultratech.com' },
  { id: 62, empId: 'UTC-4062', name: 'Neha Rao', dept: 'Quality Control', designation: 'QC Engineer', type: 'employee', shift: 'A', phone: '+91 9176778701', email: 'neha.r@ultratech.com' },
  { id: 63, empId: 'UTC-4063', name: 'Neha Yadav', dept: 'Quality Control', designation: 'QC Engineer', type: 'employee', shift: 'B', phone: '+91 9255853245', email: 'neha.y@ultratech.com' },
  { id: 64, empId: 'UTC-4064', name: 'Amit Kumar', dept: 'Quality Control', designation: 'Lab Analyst', type: 'employee', shift: 'General', phone: '+91 9205446149', email: 'amit.k@ultratech.com' },
  { id: 65, empId: 'UTC-4065', name: 'Pooja Gupta', dept: 'Quality Control', designation: 'Quality Manager', type: 'employee', shift: 'A', phone: '+91 9467141624', email: 'pooja.g@ultratech.com' },
  { id: 66, empId: 'UTC-4066', name: 'Kavita Sharma', dept: 'Quality Control', designation: 'QC Engineer', type: 'employee', shift: 'A', phone: '+91 9280845181', email: 'kavita.s@ultratech.com' },
  { id: 67, empId: 'UTC-4067', name: 'Pooja Patel', dept: 'Quality Control', designation: 'Chemist', type: 'employee', shift: 'B', phone: '+91 9827411971', email: 'pooja.p@ultratech.com' },
  { id: 68, empId: 'UTC-4068', name: 'Raj Joshi', dept: 'Quality Control', designation: 'Quality Manager', type: 'employee', shift: 'A', phone: '+91 9416699038', email: 'raj.j@ultratech.com' },
  { id: 69, empId: 'UTC-4069', name: 'Deepak Sharma', dept: 'Quality Control', designation: 'QC Engineer', type: 'employee', shift: 'General', phone: '+91 9829601726', email: 'deepak.s@ultratech.com' },
  { id: 70, empId: 'UTC-4070', name: 'Vikram Yadav', dept: 'Quality Control', designation: 'Quality Manager', type: 'employee', shift: 'General', phone: '+91 9788349267', email: 'vikram.y@ultratech.com' },
  { id: 71, empId: 'UTC-L-7071', name: 'Nisha Das', dept: 'Quality Control', designation: 'Sample Collector', type: 'labour', shift: 'B', phone: '+91 8896531873', email: '-' },
  { id: 72, empId: 'UTC-L-7072', name: 'Dinesh Yadav', dept: 'Quality Control', designation: 'Helper', type: 'labour', shift: 'B', phone: '+91 8604853934', email: '-' },
  { id: 73, empId: 'UTC-L-7073', name: 'Suresh Nair', dept: 'Quality Control', designation: 'Sample Collector', type: 'labour', shift: 'A', phone: '+91 8855288675', email: '-' },
  { id: 74, empId: 'UTC-L-7074', name: 'Vikram Singh', dept: 'Quality Control', designation: 'Helper', type: 'labour', shift: 'B', phone: '+91 8143315537', email: '-' },
  { id: 75, empId: 'UTC-L-7075', name: 'Amit Verma', dept: 'Quality Control', designation: 'Helper', type: 'labour', shift: 'A', phone: '+91 8559133177', email: '-' },
  { id: 76, empId: 'UTC-L-7076', name: 'Ramesh Iyer', dept: 'Quality Control', designation: 'Helper', type: 'labour', shift: 'C', phone: '+91 8819311140', email: '-' },
  { id: 77, empId: 'UTC-L-7077', name: 'Mohan Chauhan', dept: 'Quality Control', designation: 'Sample Collector', type: 'labour', shift: 'B', phone: '+91 8644908519', email: '-' },
  { id: 78, empId: 'UTC-L-7078', name: 'Kavita Yadav', dept: 'Quality Control', designation: 'Helper', type: 'labour', shift: 'C', phone: '+91 8618953792', email: '-' },
  { id: 79, empId: 'UTC-L-7079', name: 'Geeta Rao', dept: 'Quality Control', designation: 'Sample Collector', type: 'labour', shift: 'A', phone: '+91 8227446261', email: '-' },
  { id: 80, empId: 'UTC-L-7080', name: 'Swati Gupta', dept: 'Quality Control', designation: 'Sample Collector', type: 'labour', shift: 'A', phone: '+91 8466809811', email: '-' },
  { id: 81, empId: 'UTC-4081', name: 'Arjun Rao', dept: 'Safety & Training', designation: 'Safety Manager', type: 'employee', shift: 'B', phone: '+91 9196573482', email: 'arjun.r@ultratech.com' },
  { id: 82, empId: 'UTC-4082', name: 'Geeta Das', dept: 'Safety & Training', designation: 'Safety Officer', type: 'employee', shift: 'B', phone: '+91 9315782065', email: 'geeta.d@ultratech.com' },
  { id: 83, empId: 'UTC-4083', name: 'Neha Sharma', dept: 'Safety & Training', designation: 'Safety Officer', type: 'employee', shift: 'C', phone: '+91 9307771941', email: 'neha.s@ultratech.com' },
  { id: 84, empId: 'UTC-4084', name: 'Sanjay Nair', dept: 'Safety & Training', designation: 'Safety Manager', type: 'employee', shift: 'A', phone: '+91 9347540933', email: 'sanjay.n@ultratech.com' },
  { id: 85, empId: 'UTC-4085', name: 'Kavita Nair', dept: 'Safety & Training', designation: 'Coordinator', type: 'employee', shift: 'General', phone: '+91 9612582622', email: 'kavita.n@ultratech.com' },
  { id: 86, empId: 'UTC-4086', name: 'Ramesh Das', dept: 'Safety & Training', designation: 'Safety Officer', type: 'employee', shift: 'C', phone: '+91 9159178964', email: 'ramesh.d@ultratech.com' },
  { id: 87, empId: 'UTC-4087', name: 'Vikram Verma', dept: 'Safety & Training', designation: 'Safety Officer', type: 'employee', shift: 'General', phone: '+91 9776969259', email: 'vikram.v@ultratech.com' },
  { id: 88, empId: 'UTC-4088', name: 'Vikram Mishra', dept: 'Safety & Training', designation: 'Safety Manager', type: 'employee', shift: 'General', phone: '+91 9718686818', email: 'vikram.m@ultratech.com' },
  { id: 89, empId: 'UTC-4089', name: 'Raj Gupta', dept: 'Safety & Training', designation: 'Trainer', type: 'employee', shift: 'B', phone: '+91 9728514781', email: 'raj.g@ultratech.com' },
  { id: 90, empId: 'UTC-4090', name: 'Mahesh Singh', dept: 'Safety & Training', designation: 'Safety Manager', type: 'employee', shift: 'B', phone: '+91 9605994059', email: 'mahesh.s@ultratech.com' },
  { id: 91, empId: 'UTC-L-7091', name: 'Sunil Mishra', dept: 'Safety & Training', designation: 'Safety Assistant', type: 'labour', shift: 'General', phone: '+91 8464759190', email: '-' },
  { id: 92, empId: 'UTC-L-7092', name: 'Nisha Das', dept: 'Safety & Training', designation: 'Safety Assistant', type: 'labour', shift: 'B', phone: '+91 8589720442', email: '-' },
  { id: 93, empId: 'UTC-L-7093', name: 'Swati Joshi', dept: 'Safety & Training', designation: 'Safety Assistant', type: 'labour', shift: 'B', phone: '+91 8646961259', email: '-' },
  { id: 94, empId: 'UTC-L-7094', name: 'Manoj Das', dept: 'Safety & Training', designation: 'Safety Assistant', type: 'labour', shift: 'B', phone: '+91 8964213869', email: '-' },
  { id: 95, empId: 'UTC-L-7095', name: 'Pooja Verma', dept: 'Safety & Training', designation: 'Helper', type: 'labour', shift: 'B', phone: '+91 8972500995', email: '-' },
  { id: 96, empId: 'UTC-L-7096', name: 'Sunil Iyer', dept: 'Safety & Training', designation: 'Helper', type: 'labour', shift: 'B', phone: '+91 8103849743', email: '-' },
  { id: 97, empId: 'UTC-L-7097', name: 'Sanjay Reddy', dept: 'Safety & Training', designation: 'Helper', type: 'labour', shift: 'General', phone: '+91 8453080520', email: '-' },
  { id: 98, empId: 'UTC-L-7098', name: 'Nisha Joshi', dept: 'Safety & Training', designation: 'Helper', type: 'labour', shift: 'General', phone: '+91 8291838638', email: '-' },
  { id: 99, empId: 'UTC-L-7099', name: 'Priya Iyer', dept: 'Safety & Training', designation: 'Helper', type: 'labour', shift: 'B', phone: '+91 8780603108', email: '-' },
  { id: 100, empId: 'UTC-L-7100', name: 'Priya Rao', dept: 'Safety & Training', designation: 'Safety Assistant', type: 'labour', shift: 'General', phone: '+91 8342963087', email: '-' },
  { id: 101, empId: 'UTC-4101', name: 'Neha Gupta', dept: 'Packing Plant', designation: 'Packing Supervisor', type: 'employee', shift: 'A', phone: '+91 9828078305', email: 'neha.g@ultratech.com' },
  { id: 102, empId: 'UTC-4102', name: 'Swati Das', dept: 'Packing Plant', designation: 'Packing Supervisor', type: 'employee', shift: 'A', phone: '+91 9645081188', email: 'swati.d@ultratech.com' },
  { id: 103, empId: 'UTC-4103', name: 'Rakesh Verma', dept: 'Packing Plant', designation: 'Logistics Coordinator', type: 'employee', shift: 'A', phone: '+91 9971649260', email: 'rakesh.v@ultratech.com' },
  { id: 104, empId: 'UTC-4104', name: 'Amit Reddy', dept: 'Packing Plant', designation: 'Engineer', type: 'employee', shift: 'A', phone: '+91 9312897855', email: 'amit.r@ultratech.com' },
  { id: 105, empId: 'UTC-4105', name: 'Kavita Das', dept: 'Packing Plant', designation: 'Packing Supervisor', type: 'employee', shift: 'A', phone: '+91 9816930065', email: 'kavita.d@ultratech.com' },
  { id: 106, empId: 'UTC-4106', name: 'Rahul Nair', dept: 'Packing Plant', designation: 'Engineer', type: 'employee', shift: 'C', phone: '+91 9241540751', email: 'rahul.n@ultratech.com' },
  { id: 107, empId: 'UTC-4107', name: 'Nisha Mishra', dept: 'Packing Plant', designation: 'Logistics Coordinator', type: 'employee', shift: 'A', phone: '+91 9569002002', email: 'nisha.m@ultratech.com' },
  { id: 108, empId: 'UTC-4108', name: 'Ramesh Yadav', dept: 'Packing Plant', designation: 'Manager', type: 'employee', shift: 'B', phone: '+91 9259563893', email: 'ramesh.y@ultratech.com' },
  { id: 109, empId: 'UTC-4109', name: 'Raj Nair', dept: 'Packing Plant', designation: 'Manager', type: 'employee', shift: 'B', phone: '+91 9120186557', email: 'raj.n@ultratech.com' },
  { id: 110, empId: 'UTC-4110', name: 'Rakesh Singh', dept: 'Packing Plant', designation: 'Packing Supervisor', type: 'employee', shift: 'General', phone: '+91 9774698364', email: 'rakesh.s@ultratech.com' },
  { id: 111, empId: 'UTC-L-7111', name: 'Pooja Singh', dept: 'Packing Plant', designation: 'Loader', type: 'labour', shift: 'B', phone: '+91 8556643247', email: '-' },
  { id: 112, empId: 'UTC-L-7112', name: 'Kavita Nair', dept: 'Packing Plant', designation: 'Helper', type: 'labour', shift: 'General', phone: '+91 8155625995', email: '-' },
  { id: 113, empId: 'UTC-L-7113', name: 'Rakesh Das', dept: 'Packing Plant', designation: 'Loader', type: 'labour', shift: 'A', phone: '+91 8228342923', email: '-' },
  { id: 114, empId: 'UTC-L-7114', name: 'Nisha Joshi', dept: 'Packing Plant', designation: 'Helper', type: 'labour', shift: 'B', phone: '+91 8894624772', email: '-' },
  { id: 115, empId: 'UTC-L-7115', name: 'Kavita Nair', dept: 'Packing Plant', designation: 'Helper', type: 'labour', shift: 'General', phone: '+91 8433728559', email: '-' },
  { id: 116, empId: 'UTC-L-7116', name: 'Kavita Sharma', dept: 'Packing Plant', designation: 'Loader', type: 'labour', shift: 'General', phone: '+91 8221446610', email: '-' },
  { id: 117, empId: 'UTC-L-7117', name: 'Kavita Kumar', dept: 'Packing Plant', designation: 'Loader', type: 'labour', shift: 'B', phone: '+91 8895769250', email: '-' },
  { id: 118, empId: 'UTC-L-7118', name: 'Amit Yadav', dept: 'Packing Plant', designation: 'Helper', type: 'labour', shift: 'General', phone: '+91 8118829933', email: '-' },
  { id: 119, empId: 'UTC-L-7119', name: 'Dinesh Patel', dept: 'Packing Plant', designation: 'Loader', type: 'labour', shift: 'B', phone: '+91 8467449719', email: '-' },
  { id: 120, empId: 'UTC-L-7120', name: 'Amit Singh', dept: 'Packing Plant', designation: 'Helper', type: 'labour', shift: 'General', phone: '+91 8195248234', email: '-' },
  { id: 121, empId: 'UTC-4121', name: 'Mahesh Mishra', dept: 'Mines', designation: 'Geologist', type: 'employee', shift: 'General', phone: '+91 9267079993', email: 'mahesh.m@ultratech.com' },
  { id: 122, empId: 'UTC-4122', name: 'Amit Singh', dept: 'Mines', designation: 'Mining Engineer', type: 'employee', shift: 'A', phone: '+91 9788037854', email: 'amit.s@ultratech.com' },
  { id: 123, empId: 'UTC-4123', name: 'Sanjay Chauhan', dept: 'Mines', designation: 'Manager', type: 'employee', shift: 'General', phone: '+91 9775790310', email: 'sanjay.c@ultratech.com' },
  { id: 124, empId: 'UTC-4124', name: 'Mohan Chauhan', dept: 'Mines', designation: 'Mining Engineer', type: 'employee', shift: 'B', phone: '+91 9842539123', email: 'mohan.c@ultratech.com' },
  { id: 125, empId: 'UTC-4125', name: 'Pooja Sharma', dept: 'Mines', designation: 'Mining Engineer', type: 'employee', shift: 'B', phone: '+91 9985511489', email: 'pooja.s@ultratech.com' },
  { id: 126, empId: 'UTC-4126', name: 'Neha Patel', dept: 'Mines', designation: 'Mining Engineer', type: 'employee', shift: 'General', phone: '+91 9114840784', email: 'neha.p@ultratech.com' },
  { id: 127, empId: 'UTC-4127', name: 'Swati Patel', dept: 'Mines', designation: 'Mining Engineer', type: 'employee', shift: 'B', phone: '+91 9231554259', email: 'swati.p@ultratech.com' },
  { id: 128, empId: 'UTC-4128', name: 'Sneha Kumar', dept: 'Mines', designation: 'Mining Engineer', type: 'employee', shift: 'B', phone: '+91 9560719201', email: 'sneha.k@ultratech.com' },
  { id: 129, empId: 'UTC-4129', name: 'Deepak Verma', dept: 'Mines', designation: 'Surveyor', type: 'employee', shift: 'A', phone: '+91 9495587909', email: 'deepak.v@ultratech.com' },
  { id: 130, empId: 'UTC-4130', name: 'Sanjay Kumar', dept: 'Mines', designation: 'Manager', type: 'employee', shift: 'C', phone: '+91 9840092595', email: 'sanjay.k@ultratech.com' },
  { id: 131, empId: 'UTC-L-7131', name: 'Sanjay Gupta', dept: 'Mines', designation: 'Driller', type: 'labour', shift: 'A', phone: '+91 8393100040', email: '-' },
  { id: 132, empId: 'UTC-L-7132', name: 'Raj Rao', dept: 'Mines', designation: 'Helper', type: 'labour', shift: 'B', phone: '+91 8811475323', email: '-' },
  { id: 133, empId: 'UTC-L-7133', name: 'Dinesh Singh', dept: 'Mines', designation: 'Helper', type: 'labour', shift: 'C', phone: '+91 8452758485', email: '-' },
  { id: 134, empId: 'UTC-L-7134', name: 'Kavita Kumar', dept: 'Mines', designation: 'Driller', type: 'labour', shift: 'C', phone: '+91 8447502699', email: '-' },
  { id: 135, empId: 'UTC-L-7135', name: 'Neha Nair', dept: 'Mines', designation: 'Mine Worker', type: 'labour', shift: 'General', phone: '+91 8684130783', email: '-' },
  { id: 136, empId: 'UTC-L-7136', name: 'Ramesh Mishra', dept: 'Mines', designation: 'Helper', type: 'labour', shift: 'B', phone: '+91 8820573801', email: '-' },
  { id: 137, empId: 'UTC-L-7137', name: 'Dinesh Singh', dept: 'Mines', designation: 'Driller', type: 'labour', shift: 'A', phone: '+91 8400807566', email: '-' },
  { id: 138, empId: 'UTC-L-7138', name: 'Dinesh Patel', dept: 'Mines', designation: 'Driller', type: 'labour', shift: 'C', phone: '+91 8563535163', email: '-' },
  { id: 139, empId: 'UTC-L-7139', name: 'Sunil Das', dept: 'Mines', designation: 'Driller', type: 'labour', shift: 'B', phone: '+91 8284364767', email: '-' },
  { id: 140, empId: 'UTC-L-7140', name: 'Raj Yadav', dept: 'Mines', designation: 'Driller', type: 'labour', shift: 'B', phone: '+91 8335724577', email: '-' },
  { id: 141, empId: 'UTC-4141', name: 'Mohan Kumar', dept: 'Stores & Logistics', designation: 'Store Manager', type: 'employee', shift: 'General', phone: '+91 9256030269', email: 'mohan.k@ultratech.com' },
  { id: 142, empId: 'UTC-4142', name: 'Kavita Sharma', dept: 'Stores & Logistics', designation: 'Logistics Officer', type: 'employee', shift: 'A', phone: '+91 9811497481', email: 'kavita.s@ultratech.com' },
  { id: 143, empId: 'UTC-4143', name: 'Amit Joshi', dept: 'Stores & Logistics', designation: 'Store Manager', type: 'employee', shift: 'C', phone: '+91 9157538209', email: 'amit.j@ultratech.com' },
  { id: 144, empId: 'UTC-4144', name: 'Anita Mishra', dept: 'Stores & Logistics', designation: 'Supervisor', type: 'employee', shift: 'A', phone: '+91 9250493448', email: 'anita.m@ultratech.com' },
  { id: 145, empId: 'UTC-4145', name: 'Raj Sharma', dept: 'Stores & Logistics', designation: 'Inventory Clerk', type: 'employee', shift: 'General', phone: '+91 9971376926', email: 'raj.s@ultratech.com' },
  { id: 146, empId: 'UTC-4146', name: 'Ramesh Rao', dept: 'Stores & Logistics', designation: 'Inventory Clerk', type: 'employee', shift: 'C', phone: '+91 9331433424', email: 'ramesh.r@ultratech.com' },
  { id: 147, empId: 'UTC-4147', name: 'Geeta Iyer', dept: 'Stores & Logistics', designation: 'Inventory Clerk', type: 'employee', shift: 'B', phone: '+91 9852217046', email: 'geeta.i@ultratech.com' },
  { id: 148, empId: 'UTC-4148', name: 'Vikram Verma', dept: 'Stores & Logistics', designation: 'Inventory Clerk', type: 'employee', shift: 'C', phone: '+91 9587715735', email: 'vikram.v@ultratech.com' },
  { id: 149, empId: 'UTC-4149', name: 'Ramesh Chauhan', dept: 'Stores & Logistics', designation: 'Store Manager', type: 'employee', shift: 'B', phone: '+91 9986177220', email: 'ramesh.c@ultratech.com' },
  { id: 150, empId: 'UTC-4150', name: 'Mohan Reddy', dept: 'Stores & Logistics', designation: 'Logistics Officer', type: 'employee', shift: 'C', phone: '+91 9281229061', email: 'mohan.r@ultratech.com' },
  { id: 151, empId: 'UTC-L-7151', name: 'Sneha Iyer', dept: 'Stores & Logistics', designation: 'Helper', type: 'labour', shift: 'B', phone: '+91 8982574345', email: '-' },
  { id: 152, empId: 'UTC-L-7152', name: 'Ramesh Mishra', dept: 'Stores & Logistics', designation: 'Driver', type: 'labour', shift: 'A', phone: '+91 8489363940', email: '-' },
  { id: 153, empId: 'UTC-L-7153', name: 'Rahul Patel', dept: 'Stores & Logistics', designation: 'Driver', type: 'labour', shift: 'C', phone: '+91 8709808354', email: '-' },
  { id: 154, empId: 'UTC-L-7154', name: 'Kavita Yadav', dept: 'Stores & Logistics', designation: 'Loader', type: 'labour', shift: 'B', phone: '+91 8136134828', email: '-' },
  { id: 155, empId: 'UTC-L-7155', name: 'Raj Patel', dept: 'Stores & Logistics', designation: 'Driver', type: 'labour', shift: 'A', phone: '+91 8451977916', email: '-' },
  { id: 156, empId: 'UTC-L-7156', name: 'Vikram Gupta', dept: 'Stores & Logistics', designation: 'Helper', type: 'labour', shift: 'A', phone: '+91 8962740021', email: '-' },
  { id: 157, empId: 'UTC-L-7157', name: 'Sneha Reddy', dept: 'Stores & Logistics', designation: 'Loader', type: 'labour', shift: 'A', phone: '+91 8497552015', email: '-' },
  { id: 158, empId: 'UTC-L-7158', name: 'Geeta Singh', dept: 'Stores & Logistics', designation: 'Helper', type: 'labour', shift: 'General', phone: '+91 8301150514', email: '-' },
  { id: 159, empId: 'UTC-L-7159', name: 'Deepak Kumar', dept: 'Stores & Logistics', designation: 'Driver', type: 'labour', shift: 'C', phone: '+91 8722026543', email: '-' },
  { id: 160, empId: 'UTC-L-7160', name: 'Rahul Verma', dept: 'Stores & Logistics', designation: 'Driver', type: 'labour', shift: 'A', phone: '+91 8175121804', email: '-' },
  { id: 161, empId: 'UTC-4161', name: 'Sunil Rao', dept: 'Civil', designation: 'Site Supervisor', type: 'employee', shift: 'C', phone: '+91 9900659632', email: 'sunil.r@ultratech.com' },
  { id: 162, empId: 'UTC-4162', name: 'Dinesh Chauhan', dept: 'Civil', designation: 'Site Supervisor', type: 'employee', shift: 'A', phone: '+91 9105989782', email: 'dinesh.c@ultratech.com' },
  { id: 163, empId: 'UTC-4163', name: 'Vikram Kumar', dept: 'Civil', designation: 'Manager', type: 'employee', shift: 'A', phone: '+91 9677412231', email: 'vikram.k@ultratech.com' },
  { id: 164, empId: 'UTC-4164', name: 'Mahesh Mishra', dept: 'Civil', designation: 'Civil Engineer', type: 'employee', shift: 'General', phone: '+91 9251840824', email: 'mahesh.m@ultratech.com' },
  { id: 165, empId: 'UTC-4165', name: 'Nisha Joshi', dept: 'Civil', designation: 'Surveyor', type: 'employee', shift: 'C', phone: '+91 9366451804', email: 'nisha.j@ultratech.com' },
  { id: 166, empId: 'UTC-4166', name: 'Mohan Nair', dept: 'Civil', designation: 'Manager', type: 'employee', shift: 'General', phone: '+91 9929706827', email: 'mohan.n@ultratech.com' },
  { id: 167, empId: 'UTC-4167', name: 'Mohan Patel', dept: 'Civil', designation: 'Site Supervisor', type: 'employee', shift: 'C', phone: '+91 9279478016', email: 'mohan.p@ultratech.com' },
  { id: 168, empId: 'UTC-4168', name: 'Suresh Reddy', dept: 'Civil', designation: 'Site Supervisor', type: 'employee', shift: 'General', phone: '+91 9197333354', email: 'suresh.r@ultratech.com' },
  { id: 169, empId: 'UTC-4169', name: 'Sneha Reddy', dept: 'Civil', designation: 'Surveyor', type: 'employee', shift: 'A', phone: '+91 9747397565', email: 'sneha.r@ultratech.com' },
  { id: 170, empId: 'UTC-4170', name: 'Raj Reddy', dept: 'Civil', designation: 'Site Supervisor', type: 'employee', shift: 'A', phone: '+91 9342568219', email: 'raj.r@ultratech.com' },
  { id: 171, empId: 'UTC-L-7171', name: 'Rakesh Kumar', dept: 'Civil', designation: 'Carpenter', type: 'labour', shift: 'C', phone: '+91 8984160743', email: '-' },
  { id: 172, empId: 'UTC-L-7172', name: 'Manoj Sharma', dept: 'Civil', designation: 'Mason', type: 'labour', shift: 'C', phone: '+91 8990791139', email: '-' },
  { id: 173, empId: 'UTC-L-7173', name: 'Anjali Das', dept: 'Civil', designation: 'Helper', type: 'labour', shift: 'A', phone: '+91 8678029999', email: '-' },
  { id: 174, empId: 'UTC-L-7174', name: 'Nisha Sharma', dept: 'Civil', designation: 'Carpenter', type: 'labour', shift: 'B', phone: '+91 8981921036', email: '-' },
  { id: 175, empId: 'UTC-L-7175', name: 'Arjun Singh', dept: 'Civil', designation: 'Helper', type: 'labour', shift: 'C', phone: '+91 8982948841', email: '-' },
  { id: 176, empId: 'UTC-L-7176', name: 'Neha Rao', dept: 'Civil', designation: 'Carpenter', type: 'labour', shift: 'General', phone: '+91 8450758905', email: '-' },
  { id: 177, empId: 'UTC-L-7177', name: 'Rahul Kumar', dept: 'Civil', designation: 'Mason', type: 'labour', shift: 'C', phone: '+91 8760614263', email: '-' },
  { id: 178, empId: 'UTC-L-7178', name: 'Rahul Iyer', dept: 'Civil', designation: 'Carpenter', type: 'labour', shift: 'C', phone: '+91 8926329011', email: '-' },
  { id: 179, empId: 'UTC-L-7179', name: 'Geeta Singh', dept: 'Civil', designation: 'Mason', type: 'labour', shift: 'A', phone: '+91 8917928241', email: '-' },
  { id: 180, empId: 'UTC-L-7180', name: 'Rakesh Yadav', dept: 'Civil', designation: 'Mason', type: 'labour', shift: 'General', phone: '+91 8912825472', email: '-' },
  { id: 181, empId: 'UTC-4181', name: 'Sunil Mishra', dept: 'IT', designation: 'IT Support', type: 'employee', shift: 'General', phone: '+91 9475651792', email: 'sunil.m@ultratech.com' },
  { id: 182, empId: 'UTC-4182', name: 'Vikram Verma', dept: 'IT', designation: 'IT Support', type: 'employee', shift: 'C', phone: '+91 9875469757', email: 'vikram.v@ultratech.com' },
  { id: 183, empId: 'UTC-4183', name: 'Raj Verma', dept: 'IT', designation: 'System Admin', type: 'employee', shift: 'C', phone: '+91 9515121182', email: 'raj.v@ultratech.com' },
  { id: 184, empId: 'UTC-4184', name: 'Ramesh Yadav', dept: 'IT', designation: 'Network Engineer', type: 'employee', shift: 'General', phone: '+91 9544121875', email: 'ramesh.y@ultratech.com' },
  { id: 185, empId: 'UTC-4185', name: 'Dinesh Sharma', dept: 'IT', designation: 'Network Engineer', type: 'employee', shift: 'C', phone: '+91 9495814777', email: 'dinesh.s@ultratech.com' },
  { id: 186, empId: 'UTC-4186', name: 'Kavita Nair', dept: 'IT', designation: 'Network Engineer', type: 'employee', shift: 'A', phone: '+91 9517576772', email: 'kavita.n@ultratech.com' },
  { id: 187, empId: 'UTC-4187', name: 'Suresh Patel', dept: 'IT', designation: 'IT Manager', type: 'employee', shift: 'C', phone: '+91 9761084112', email: 'suresh.p@ultratech.com' },
  { id: 188, empId: 'UTC-4188', name: 'Anita Joshi', dept: 'IT', designation: 'System Admin', type: 'employee', shift: 'B', phone: '+91 9146840378', email: 'anita.j@ultratech.com' },
  { id: 189, empId: 'UTC-4189', name: 'Priya Iyer', dept: 'IT', designation: 'IT Manager', type: 'employee', shift: 'A', phone: '+91 9555652390', email: 'priya.i@ultratech.com' },
  { id: 190, empId: 'UTC-4190', name: 'Priya Yadav', dept: 'IT', designation: 'IT Manager', type: 'employee', shift: 'B', phone: '+91 9783710161', email: 'priya.y@ultratech.com' },
  { id: 191, empId: 'UTC-L-7191', name: 'Nisha Rao', dept: 'IT', designation: 'Technician Assistant', type: 'labour', shift: 'C', phone: '+91 8143212236', email: '-' },
  { id: 192, empId: 'UTC-L-7192', name: 'Anita Joshi', dept: 'IT', designation: 'Technician Assistant', type: 'labour', shift: 'A', phone: '+91 8237372111', email: '-' },
  { id: 193, empId: 'UTC-L-7193', name: 'Rahul Singh', dept: 'IT', designation: 'Helper', type: 'labour', shift: 'A', phone: '+91 8907502708', email: '-' },
  { id: 194, empId: 'UTC-L-7194', name: 'Vikram Das', dept: 'IT', designation: 'Technician Assistant', type: 'labour', shift: 'B', phone: '+91 8960149078', email: '-' },
  { id: 195, empId: 'UTC-L-7195', name: 'Neha Joshi', dept: 'IT', designation: 'Helper', type: 'labour', shift: 'C', phone: '+91 8396389760', email: '-' },
  { id: 196, empId: 'UTC-L-7196', name: 'Raj Reddy', dept: 'IT', designation: 'Technician Assistant', type: 'labour', shift: 'General', phone: '+91 8931634688', email: '-' },
  { id: 197, empId: 'UTC-L-7197', name: 'Priya Rao', dept: 'IT', designation: 'Helper', type: 'labour', shift: 'General', phone: '+91 8208510269', email: '-' },
  { id: 198, empId: 'UTC-L-7198', name: 'Rakesh Joshi', dept: 'IT', designation: 'Helper', type: 'labour', shift: 'General', phone: '+91 8458274184', email: '-' },
  { id: 199, empId: 'UTC-L-7199', name: 'Mahesh Joshi', dept: 'IT', designation: 'Technician Assistant', type: 'labour', shift: 'B', phone: '+91 8236027498', email: '-' },
  { id: 200, empId: 'UTC-L-7200', name: 'Pooja Verma', dept: 'IT', designation: 'Helper', type: 'labour', shift: 'A', phone: '+91 8540556633', email: '-' },
];

const INITIAL_SESSIONS = [
  {
    id: 1, title: 'Fire Safety & Emergency Response Drill', mode: 'offline',
    date: '2026-05-12', time: '10:00', duration: 120,
    venue: 'Training Hall A, Admin Block', meetingLink: '',
    instructor: 'Anjali Verma', instructorDept: 'Safety & Training', instructorDesignation: 'Senior Safety Trainer',
    aim: 'Hands-on training on fire extinguisher operation, evacuation routes, and emergency assembly protocols at the Rawan plant.',
    department: 'Packing Plant', participants: [3, 4, 5, 9], status: 'scheduled', attendance: null
  },
  {
    id: 2, title: 'ISO 9001:2015 Quality Awareness', mode: 'online',
    date: '2026-05-10', time: '14:00', duration: 90,
    venue: '', meetingLink: 'https://meet.ultratech.com/qms-iso-may10',
    instructor: 'Rajesh Kumar', instructorDept: 'Central Training Cell', instructorDesignation: 'Training Controller',
    aim: 'Refresher session on ISO 9001:2015 requirements, internal audit findings, and corrective action workflow.',
    department: 'Quality Control', participants: [1, 2], status: 'scheduled', attendance: null
  },
  {
    id: 3, title: 'Working at Heights - Mandatory Refresher', mode: 'offline',
    date: '2026-05-09', time: '09:00', duration: 180,
    venue: 'Safety Training Ground, Block C', meetingLink: '',
    instructor: 'Anjali Verma', instructorDept: 'Safety & Training', instructorDesignation: 'Senior Safety Trainer',
    aim: 'Mandatory annual refresher on safe work at heights, harness usage, and rescue procedures as per IS 3696.',
    department: 'Mechanical Maintenance', participants: [11], status: 'completed', attendance: { present: 1, absent: 0 }
  },
  {
    id: 4, title: 'LinkedIn Learning - Project Management Foundations', mode: 'third_party',
    date: '2026-05-15', time: '00:00', duration: 0,
    venue: '', meetingLink: 'https://linkedin.com/learning/project-management-foundations',
    instructor: 'Self-paced', instructorDept: '-', instructorDesignation: 'External Course',
    aim: 'Self-paced certification course covering PM fundamentals. Completion deadline: May 25, 2026.',
    department: 'Production', participants: [6, 7, 8], status: 'scheduled', attendance: null
  }
];

// ============================================================================
// HELPERS
// ============================================================================

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatDateShort = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

const getModeIcon = (mode) => {
  if (mode === 'online') return <Video className="w-3.5 h-3.5" />;
  if (mode === 'offline') return <MapPin className="w-3.5 h-3.5" />;
  return <ExternalLink className="w-3.5 h-3.5" />;
};

const getModeLabel = (mode) => {
  if (mode === 'online') return 'Online';
  if (mode === 'offline') return 'Offline';
  return 'Third-Party';
};

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

const Logo = ({ small = false }) => (
  <div className="flex items-center gap-2.5">
    <div className={`${small ? 'w-8 h-8' : 'w-10 h-10'} bg-gradient-to-br from-teal-600 to-teal-800 rounded-md flex items-center justify-center shadow-sm`}>
      <Building2 className={`${small ? 'w-4 h-4' : 'w-5 h-5'} text-white`} strokeWidth={2.5} />
    </div>
    {!small && (
      <div>
        <div className="text-[15px] font-bold text-slate-900 leading-tight tracking-tight">UltraTech</div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Rawan Training</div>
      </div>
    )}
  </div>
);

const Badge = ({ children, color = 'slate' }) => {
  const colors = {
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    red: 'bg-red-50 text-red-700 border-red-200',
  };
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium border rounded ${colors[color]}`}>{children}</span>;
};

const StatCard = ({ label, value, sub, accent = false }) => (
  <div className={`p-5 rounded-lg border ${accent ? 'bg-teal-50/50 border-teal-200' : 'bg-white border-slate-200'}`}>
    <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium mb-2">{label}</div>
    <div className={`text-3xl font-bold ${accent ? 'text-teal-700' : 'text-slate-900'} tracking-tight`}>{value}</div>
    {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
  </div>
);

// ============================================================================
// SCHEDULE SESSION MODAL (Hero feature)
// ============================================================================

const ScheduleSessionModal = ({ onClose, onSchedule }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '', mode: 'offline', department: '', date: '', time: '', duration: 60,
    venue: '', meetingLink: '', instructor: '', instructorDept: '', instructorDesignation: '',
    aim: ''
  });
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [filterDept, setFilterDept] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');

  const filteredWorkforce = useMemo(() => {
    return WORKFORCE.filter(w => {
      if (filterDept !== 'all' && w.dept !== filterDept) return false;
      if (filterType !== 'all' && w.type !== filterType) return false;
      if (search && !w.name.toLowerCase().includes(search.toLowerCase()) && !w.empId.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filterDept, filterType, search]);

  const toggleParticipant = (id) => {
    setSelectedParticipants(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const selectAllFiltered = () => {
    const ids = filteredWorkforce.map(w => w.id);
    setSelectedParticipants(prev => [...new Set([...prev, ...ids])]);
  };

  const canProceedStep1 = form.title && form.date && form.time && form.aim &&
    (form.mode === 'offline' ? form.venue : form.mode === 'online' ? form.meetingLink : form.meetingLink);

  const handleSchedule = () => {
    const newSession = {
      id: Date.now(),
      ...form,
      participants: selectedParticipants,
      status: 'scheduled',
      attendance: null
    };
    onSchedule(newSession, selectedParticipants);
  };

  const labourCount = selectedParticipants.filter(id => WORKFORCE.find(w => w.id === id)?.type === 'labour').length;
  const employeeCount = selectedParticipants.length - labourCount;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-teal-600 to-teal-700">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Schedule New Training Session</h2>
            <p className="text-[12px] text-teal-100 mt-0.5">Step {step} of 3 — {step === 1 ? 'Session Details' : step === 2 ? 'Select Participants' : 'Review & Confirm'}</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1.5 rounded hover:bg-white/10 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="px-6 pt-4 pb-2 bg-slate-50 border-b border-slate-200">
          <div className="flex gap-1">
            {[1, 2, 3].map(s => (
              <div key={s} className={`flex-1 h-1 rounded-full transition-all ${s <= step ? 'bg-teal-600' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Session Title</label>
                <input
                  type="text" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Fire Safety Refresher Training"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Training Mode</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {[
                    { id: 'offline', label: 'Offline', icon: MapPin, desc: 'Physical venue' },
                    { id: 'online', label: 'Online', icon: Video, desc: 'Virtual meeting' },
                    { id: 'third_party', label: 'Third-Party', icon: ExternalLink, desc: 'External course' },
                  ].map(m => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id} onClick={() => setForm({ ...form, mode: m.id })}
                        className={`p-3 rounded-lg border-2 text-left transition ${form.mode === m.id ? 'border-teal-600 bg-teal-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                      >
                        <Icon className={`w-4 h-4 mb-1.5 ${form.mode === m.id ? 'text-teal-700' : 'text-slate-600'}`} />
                        <div className={`text-sm font-semibold ${form.mode === m.id ? 'text-teal-900' : 'text-slate-900'}`}>{m.label}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{m.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Date</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Time</label>
                  <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Duration (minutes)</label>
                  <input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Target Department</label>
                  <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                    <option value="">Select department</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {(form.mode === 'offline') && (
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Venue</label>
                  <input type="text" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="e.g., Training Hall A, Admin Block" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
              )}

              {(form.mode === 'online' || form.mode === 'third_party') && (
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">{form.mode === 'online' ? 'Meeting Link' : 'Course URL'}</label>
                  <input type="url" value={form.meetingLink} onChange={(e) => setForm({ ...form, meetingLink: e.target.value })} placeholder="https://..." className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Instructor Name</label>
                  <input type="text" value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} placeholder="Full name" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Department</label>
                  <input type="text" value={form.instructorDept} onChange={(e) => setForm({ ...form, instructorDept: e.target.value })} placeholder="e.g., Safety & Training" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Designation</label>
                  <input type="text" value={form.instructorDesignation} onChange={(e) => setForm({ ...form, instructorDesignation: e.target.value })} placeholder="e.g., Senior Trainer" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Aim & Objectives</label>
                <textarea value={form.aim} onChange={(e) => setForm({ ...form, aim: e.target.value })} rows={3} placeholder="What will participants learn? What is the goal of this session?" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none resize-none" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Select Participants</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Choose employees and labours from the SAP-synced workforce directory</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color="teal">{selectedParticipants.length} selected</Badge>
                  {employeeCount > 0 && <Badge color="slate">{employeeCount} employees</Badge>}
                  {labourCount > 0 && <Badge color="orange">{labourCount} labours</Badge>}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or employee ID..." className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-teal-500 outline-none">
                  <option value="all">All Departments</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-teal-500 outline-none">
                  <option value="all">All Types</option>
                  <option value="employee">Employees</option>
                  <option value="labour">Labours</option>
                </select>
                <button onClick={selectAllFiltered} className="px-3 py-2 text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition">
                  Select All ({filteredWorkforce.length})
                </button>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-x-auto">
                <div className="min-w-[700px]">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 grid grid-cols-12 gap-3 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  <div className="col-span-1"></div>
                  <div className="col-span-3">Name</div>
                  <div className="col-span-2">Emp ID</div>
                  <div className="col-span-3">Department</div>
                  <div className="col-span-2">Designation</div>
                  <div className="col-span-1">Type</div>
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {filteredWorkforce.map(w => {
                    const sel = selectedParticipants.includes(w.id);
                    return (
                      <div key={w.id} onClick={() => toggleParticipant(w.id)}
                        className={`px-4 py-3 grid grid-cols-12 gap-3 items-center text-sm cursor-pointer border-b border-slate-100 last:border-b-0 transition ${sel ? 'bg-teal-50' : 'hover:bg-slate-50'}`}>
                        <div className="col-span-1">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${sel ? 'bg-teal-600 border-teal-600' : 'border-slate-300'}`}>
                            {sel && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                          </div>
                        </div>
                        <div className="col-span-3 font-medium text-slate-900">{w.name}</div>
                        <div className="col-span-2 text-slate-600 font-mono text-[12px]">{w.empId}</div>
                        <div className="col-span-3 text-slate-600">{w.dept}</div>
                        <div className="col-span-2 text-slate-600 text-[13px]">{w.designation}</div>
                        <div className="col-span-1">
                          <Badge color={w.type === 'labour' ? 'orange' : 'slate'}>{w.type === 'labour' ? 'Labour' : 'Emp'}</Badge>
                        </div>
                      </div>
                    );
                  })}
                  {filteredWorkforce.length === 0 && (
                    <div className="py-12 text-center text-sm text-slate-500">No matching workforce records</div>
                  )}
                </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 border border-teal-200 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    {getModeIcon(form.mode)}
                  </div>
                  <div className="flex-1">
                    <Badge color="teal">{getModeLabel(form.mode)}</Badge>
                    <h3 className="text-lg font-bold text-slate-900 mt-1.5">{form.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{form.aim}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Schedule</div>
                  <div className="text-sm text-slate-900 font-medium">{formatDate(form.date)} at {form.time}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Duration: {form.duration} minutes</div>
                </div>
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2">{form.mode === 'offline' ? 'Venue' : 'Link'}</div>
                  <div className="text-sm text-slate-900 font-medium truncate">{form.mode === 'offline' ? form.venue : form.meetingLink}</div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg p-4">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Instructor</div>
                <div className="text-sm text-slate-900 font-medium">{form.instructor}</div>
                <div className="text-xs text-slate-500 mt-0.5">{form.instructorDesignation} — {form.instructorDept}</div>
              </div>

              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Participants</div>
                  <div className="flex gap-2">
                    <Badge color="teal">{selectedParticipants.length} total</Badge>
                    {employeeCount > 0 && <Badge color="slate">{employeeCount} emp</Badge>}
                    {labourCount > 0 && <Badge color="orange">{labourCount} labours</Badge>}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                  {selectedParticipants.map(id => {
                    const w = WORKFORCE.find(p => p.id === id);
                    return w ? <span key={id} className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-slate-700 text-[12px] rounded">{w.name}</span> : null;
                  })}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <Bell className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-amber-900">Notifications will be triggered automatically</div>
                    <ul className="text-xs text-amber-800 mt-1.5 space-y-1">
                      <li>• Immediate notification to all {selectedParticipants.length} participants (Email + SMS)</li>
                      <li>• 24-hour reminder on {form.date && formatDate(form.date)}</li>
                      <li>• 2-hour final reminder before session starts</li>
                      {labourCount > 0 && <li>• {labourCount} labour participants will receive SMS-only notifications</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <button onClick={step === 1 ? onClose : () => setStep(step - 1)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition">
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <div className="flex gap-2">
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={(step === 1 && !canProceedStep1) || (step === 2 && selectedParticipants.length === 0)}
                className="px-5 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            ) : (
              <button onClick={handleSchedule} className="px-5 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition flex items-center gap-2">
                <Send className="w-4 h-4" /> Schedule & Send Notifications
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// NOTIFICATION TOAST
// ============================================================================

const NotificationLog = ({ log, onClose }) => (
  <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-teal-600 to-teal-700 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Notifications Sent</h2>
          <p className="text-[12px] text-teal-100 mt-0.5">{log.length} messages dispatched via Email & SMS gateway</p>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white p-1.5 rounded hover:bg-white/10 transition">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-2">
        {log.map((entry, i) => (
          <div key={i} className="border border-slate-200 rounded-lg p-3.5 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-teal-100 rounded-full flex items-center justify-center">
                  {entry.channel === 'email' ? <Mail className="w-3.5 h-3.5 text-teal-700" /> : <Phone className="w-3.5 h-3.5 text-teal-700" />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{entry.recipient}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{entry.channel === 'email' ? entry.email : entry.phone}</div>
                </div>
              </div>
              <Badge color="green"><Check className="w-3 h-3" /> Delivered</Badge>
            </div>
            <div className="text-[12px] text-slate-600 bg-slate-50 px-3 py-2 rounded border border-slate-100">
              {entry.message}
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 text-[12px] text-slate-600 flex items-center gap-2">
        <AlertCircle className="w-3.5 h-3.5" />
        Reminders will auto-trigger 24h and 2h before session start time.
      </div>
    </div>
  </div>
);

// ============================================================================
// SESSION DETAIL PANEL
// ============================================================================

const SessionDetailPanel = ({ session, onClose, role }) => {
  if (!session) return null;
  const participants = session.participants.map(id => WORKFORCE.find(w => w.id === id)).filter(Boolean);
  const labourCount = participants.filter(p => p.type === 'labour').length;
  const employeeCount = participants.length - labourCount;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge color="teal">{getModeLabel(session.mode)}</Badge>
              {session.status === 'completed' && <Badge color="green">Completed</Badge>}
              {session.status === 'scheduled' && <Badge color="blue">Scheduled</Badge>}
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">{session.title}</h2>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1.5 rounded hover:bg-white/10 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">Aim & Objectives</div>
            <p className="text-sm text-slate-700 leading-relaxed">{session.aim}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-slate-200 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1"><Calendar className="w-3 h-3" /> Date & Time</div>
              <div className="text-sm font-semibold text-slate-900">{formatDate(session.date)}</div>
              <div className="text-xs text-slate-600">{session.time} • {session.duration} min</div>
            </div>
            <div className="border border-slate-200 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">{session.mode === 'offline' ? <MapPin className="w-3 h-3" /> : <Video className="w-3 h-3" />} {session.mode === 'offline' ? 'Venue' : 'Link'}</div>
              <div className="text-sm font-semibold text-slate-900 truncate">{session.mode === 'offline' ? session.venue : session.meetingLink}</div>
            </div>
          </div>
          <div className="border border-slate-200 rounded-lg p-3.5">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2"><GraduationCap className="w-3 h-3" /> Instructor</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-sm">
                {session.instructor.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{session.instructor}</div>
                <div className="text-xs text-slate-600">{session.instructorDesignation} • {session.instructorDept}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Participants ({participants.length})</div>
              <div className="flex gap-1.5">
                {employeeCount > 0 && <Badge color="slate">{employeeCount} emp</Badge>}
                {labourCount > 0 && <Badge color="orange">{labourCount} labours</Badge>}
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
              {participants.map(p => (
                <div key={p.id} className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100 last:border-b-0">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{p.name}</div>
                    <div className="text-[11px] text-slate-500">{p.empId} • {p.designation}</div>
                  </div>
                  <Badge color={p.type === 'labour' ? 'orange' : 'slate'}>{p.type === 'labour' ? 'Labour' : 'Emp'}</Badge>
                </div>
              ))}
            </div>
          </div>
          {session.mode === 'offline' && session.status === 'scheduled' && (role === 'instructor' || role === 'super_admin') && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <Camera className="w-4 h-4 text-amber-700" />
                <div className="text-sm font-semibold text-amber-900">Attendance Capture (Offline)</div>
              </div>
              <p className="text-xs text-amber-800">On the day of the session, the instructor can upload group photos. Face recognition will auto-match participants against registered profiles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
  const [currentRole, setCurrentRole] = useState('super_admin');
  const [activeView, setActiveView] = useState('dashboard');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [notifLog, setNotifLog] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = CURRENT_USERS[currentRole];
  const role = ROLES[Object.keys(ROLES).find(k => ROLES[k].id === currentRole)];

  const handleScheduleSession = (newSession, participantIds) => {
    setSessions([newSession, ...sessions]);
    const log = [];
    participantIds.forEach(pid => {
      const p = WORKFORCE.find(w => w.id === pid);
      if (!p) return;
      const msg = `Training Alert: You are scheduled for "${newSession.title}" on ${formatDate(newSession.date)} at ${newSession.time}. ${newSession.mode === 'offline' ? `Venue: ${newSession.venue}` : `Link: ${newSession.meetingLink}`}. Trainer: ${newSession.instructor}.`;
      if (p.email !== '-') log.push({ recipient: p.name, channel: 'email', email: p.email, message: msg });
      log.push({ recipient: p.name, channel: 'sms', phone: p.phone, message: msg });
    });
    setShowScheduleModal(false);
    setNotifLog(log);
  };

  // Filter sessions based on role
  const visibleSessions = useMemo(() => {
    if (currentRole === 'employee' || currentRole === 'labour') {
      const userId = WORKFORCE.find(w => w.empId === user.empId)?.id;
      return sessions.filter(s => s.participants.includes(userId));
    }
    if (currentRole === 'instructor') {
      return sessions.filter(s => s.instructor === user.name);
    }
    if (currentRole === 'hod' || currentRole === 'hr') {
      return sessions.filter(s => s.department === user.dept || s.department === 'all');
    }
    return sessions;
  }, [sessions, currentRole, user]);

  const upcomingSessions = visibleSessions.filter(s => s.status === 'scheduled');
  const completedSessions = visibleSessions.filter(s => s.status === 'completed');

  const stats = {
    total: visibleSessions.length,
    upcoming: upcomingSessions.length,
    completed: completedSessions.length,
    participants: [...new Set(visibleSessions.flatMap(s => s.participants))].length
  };

  // Role-specific menu items
  const menuItems = useMemo(() => {
    const base = [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }];
    if (['super_admin', 'hr'].includes(currentRole)) {
      base.push(
        { id: 'sessions', label: 'All Sessions', icon: Calendar },
        { id: 'workforce', label: 'Workforce', icon: Users },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'reports', label: 'Reports', icon: FileText }
      );
    } else if (currentRole === 'hod') {
      base.push(
        { id: 'sessions', label: 'Department Sessions', icon: Calendar },
        { id: 'reports', label: 'Reports', icon: FileText }
      );
    } else if (currentRole === 'instructor') {
      base.push(
        { id: 'sessions', label: 'My Sessions', icon: Calendar },
        { id: 'attendance', label: 'Attendance', icon: Camera }
      );
    } else {
      base.push({ id: 'sessions', label: 'My Trainings', icon: Calendar });
    }
    return base;
  }, [currentRole]);

  const canSchedule = ['super_admin', 'hr'].includes(currentRole);

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>
      {/* Mobile Sidebar Backdrop */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-200">
          <Logo />
        </div>

        <div className="p-3 border-b border-slate-200">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold px-3 mb-2">Demo Mode</div>
          <button onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
            className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full bg-${role.color}-100 flex items-center justify-center`}>
                <role.icon className={`w-3.5 h-3.5 text-${role.color}-700`} />
              </div>
              <div className="text-left">
                <div className="text-[12px] font-semibold text-slate-900 leading-tight">{role.name}</div>
                <div className="text-[10px] text-slate-500">Switch role</div>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition ${roleSwitcherOpen ? 'rotate-180' : ''}`} />
          </button>

          {roleSwitcherOpen && (
            <div className="mt-2 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
              {Object.values(ROLES).map(r => {
                const RIcon = r.icon;
                const active = currentRole === r.id;
                return (
                  <button key={r.id} onClick={() => { setCurrentRole(r.id); setActiveView('dashboard'); setRoleSwitcherOpen(false); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left transition ${active ? 'bg-teal-50' : 'hover:bg-slate-50'}`}>
                    <div className={`w-6 h-6 rounded-full bg-${r.color}-100 flex items-center justify-center`}>
                      <RIcon className={`w-3 h-3 text-${r.color}-700`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[12px] font-medium text-slate-900">{r.name}</div>
                      <div className="text-[10px] text-slate-500">{r.label}</div>
                    </div>
                    {active && <Check className="w-3.5 h-3.5 text-teal-600" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <nav className="flex-1 p-3">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold px-3 mb-2 mt-1">Menu</div>
          {menuItems.map(item => {
            const Icon = item.icon;
            const active = activeView === item.id;
            return (
              <button key={item.id} onClick={() => { setActiveView(item.id); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium mb-0.5 transition ${active ? 'bg-teal-50 text-teal-800' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                <Icon className={`w-4 h-4 ${active ? 'text-teal-700' : 'text-slate-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg md:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-bold text-slate-900 tracking-tight">
                {activeView === 'dashboard' && 'Dashboard'}
                {activeView === 'sessions' && (currentRole === 'employee' || currentRole === 'labour' ? 'My Trainings' : currentRole === 'instructor' ? 'My Sessions' : currentRole === 'hod' ? 'Department Sessions' : 'All Sessions')}
                {activeView === 'workforce' && 'Workforce Directory'}
                {activeView === 'notifications' && 'Notifications'}
                {activeView === 'reports' && 'Reports'}
                {activeView === 'attendance' && 'Attendance Capture'}
              </h1>
              <p className="text-[12px] text-slate-500 hidden sm:block">UltraTech Cement — Rawan Cement Works</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {canSchedule && (
              <button onClick={() => setShowScheduleModal(true)}
                className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition flex items-center gap-1 sm:gap-1.5 shadow-sm whitespace-nowrap">
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
                <span className="hidden sm:inline">Schedule Session</span>
                <span className="sm:hidden">Schedule</span>
              </button>
            )}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className={`w-9 h-9 rounded-full bg-${role.color}-100 flex items-center justify-center text-${role.color}-700 font-bold text-sm`}>
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 leading-tight">{user.name}</div>
                <div className="text-[11px] text-slate-500">{user.designation}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatCard label="Total Sessions" value={stats.total} sub="Visible to your role" accent />
            <StatCard label="Upcoming" value={stats.upcoming} sub="Scheduled sessions" />
            <StatCard label="Completed" value={stats.completed} sub="Completed sessions" />
          </div>

          {activeView === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-slate-900">Upcoming Sessions</h2>
                    <div className="text-xs text-slate-500">{upcomingSessions.length} scheduled</div>
                  </div>

                  <div className="space-y-3">
                    {visibleSessions.map(s => (
                      <div key={s.id} className="p-3 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 active:bg-slate-100 transition cursor-pointer" onClick={() => setSelectedSession(s)}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-slate-900 leading-tight">{s.title}</div>
                            <div className="text-[12px] text-slate-500 mt-1">{formatDate(s.date)} • {s.time} • {getModeLabel(s.mode)}</div>
                          </div>
                          <div className="text-right hidden sm:block">
                            <div className="text-sm font-semibold text-slate-900">{s.instructor}</div>
                            <div className="text-xs text-slate-500">{s.instructorDesignation}</div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Workforce</h3>
                  <div className="space-y-2">
                    {WORKFORCE.slice(0, 6).map(w => (
                      <div key={w.id} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-slate-900">{w.name}</div>
                          <div className="text-xs text-slate-500">{w.designation} • {w.dept}</div>
                        </div>
                        <Badge color={w.type === 'labour' ? 'orange' : 'slate'}>{w.type === 'labour' ? 'Labour' : 'Emp'}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 bg-white border border-slate-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Notifications</h3>
                  <p className="text-xs text-slate-500">{notifLog ? `${notifLog.length} messages sent` : 'No notifications sent yet'}</p>
                </div>
              </div>
            </div>
          )}

          {activeView === 'sessions' && (
            <div>
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <h2 className="text-sm font-semibold text-slate-900 mb-3">All Sessions</h2>
                <div className="space-y-2">
                  {visibleSessions.map(s => (
                    <div key={s.id} className="p-3 border border-slate-100 rounded-lg bg-white hover:shadow-sm transition cursor-pointer" onClick={() => setSelectedSession(s)}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{s.title}</div>
                          <div className="text-[12px] text-slate-500 mt-1">{formatDate(s.date)} • {s.time}</div>
                        </div>
                        <div className="text-sm text-slate-500">{getModeLabel(s.mode)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showScheduleModal && <ScheduleSessionModal onClose={() => setShowScheduleModal(false)} onSchedule={handleScheduleSession} />}
          {notifLog && <NotificationLog log={notifLog} onClose={() => setNotifLog(null)} />}
          {selectedSession && <SessionDetailPanel session={selectedSession} onClose={() => setSelectedSession(null)} role={currentRole} />}
        </main>
      </div>
    </div>
  );
}
