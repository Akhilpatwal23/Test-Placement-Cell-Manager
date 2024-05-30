import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaBriefcase, FaRegComments, FaUserCheck } from "react-icons/fa";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { app } from "../firebase";

const DashboardComp = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [lastMonthJobs, setLastMonthJobs] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [applications, setApplications] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [lastMonthApplications, setLastMonthApplications] = useState(0);
  const [placedStudents, setPlacedStudents] = useState([]);
  const [totalPlacedStudents, setTotalPlacedStudents] = useState(0);
  const [lastMonthPlacedStudents, setLastMonthPlacedStudents] = useState(0);

  console.log(applications);

  useEffect(() => {
    const ftechUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/job/getjobs?limit=5");
        const data = await res.json();
        if (res.ok) {
          setJobs(data.jobs);
          setTotalJobs(data.totalJobs);
          setLastMonthJobs(data.lastMonthJobs);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/application/getapplications?limit=5");
        const data = await res.json();
        if (res.ok) {
          setApplications(data.applications);
          setTotalApplications(data.totalApplications);
          setLastMonthApplications(data.lastMonthApplications);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPlacedStudents = async () => {
      try {
        const res = await fetch("/api/application/getapplications?limit=5");

        if (res.ok) {
          const data = await res.json();
          const placedStudent = data.applications.filter(
            (application) => application.applicationStatus === "Accepted"
          );
          setPlacedStudents(placedStudent);
          setTotalPlacedStudents(placedStudent.length);

          setLastMonthPlacedStudents(placedStudent.length);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      ftechUsers();
      fetchPosts();
      fetchComments();
      fetchJobs();
      fetchApplications();
      fetchPlacedStudents();
    }
  }, [currentUser]);
  return (
    <div className="p-3 md:mx-auto py-10">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className=" text-gray-500 text-md uppercase">Total Users</h3>
              <p>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className=" text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className=" text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className=" text-gray-500 text-md uppercase">Total Jobs</h3>
              <p>{totalJobs}</p>
            </div>
            <FaBriefcase className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />{" "}
          </div>
          <div className="flex gap-2 text-sm">
            <span className=" text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthJobs}
            </span>
            <div className=" text-gray-500">Last month</div>
          </div>
        </div>

        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className=" text-gray-500 text-md uppercase">
                Total Placed Students
              </h3>
              <p>{totalPlacedStudents}</p>
            </div>
            <FaUserCheck className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className=" text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPlacedStudents}
            </span>
            <div className=" text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className=" text-gray-500 text-md uppercase">
                Total Applications
              </h3>
              <p>{totalApplications}</p>
            </div>
            <HiDocumentText className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className=" text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthApplications}
            </span>
            <div className=" text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center mt-5">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className=" text-center p-2">Recent Users</h1>
            <Button type="button" gradientDuoTone="purpleToBlue" outline>
              <Link to="/dashboard?tab=users">View All</Link>
            </Button>
          </div>
          <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>User image</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
              </Table.Head>
              <Table.Body className=" divide-y">
                {users &&
                  users.map((user) => (
                    <Table.Row
                      key={user._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className="w-10 h-10 rounded-full bg-gray-500"
                        />
                      </Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className=" text-center p-2">Recent Jobs</h1>
            <Button type="button" gradientDuoTone="purpleToBlue" outline>
              <Link to="/dashboard?tab=jobs">View All</Link>
            </Button>
          </div>
          <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Job Title</Table.HeadCell>
                <Table.HeadCell>Company</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
              </Table.Head>
              <Table.Body className=" divide-y">
                {jobs &&
                  jobs.map((job) => (
                    <Table.Row
                      key={job._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>{job.jobTitle}</Table.Cell>
                      <Table.Cell>{job.companyName}</Table.Cell>
                      <Table.Cell>{job.jobCategory}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className=" text-center p-2">Recent Placed Students</h1>
            <Button type="button" gradientDuoTone="purpleToBlue" outline>
              <Link to="/dashboard?tab=placedStudent">View All</Link>
            </Button>
          </div>
          <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Student Name</Table.HeadCell>
                <Table.HeadCell>Student Email</Table.HeadCell>
                {/* <Table.HeadCell>Student Course</Table.HeadCell>
                <Table.HeadCell>Student Branch</Table.HeadCell>
                <Table.HeadCell>PassOut Year</Table.HeadCell>
                <Table.HeadCell>Comapny Name</Table.HeadCell>
                <Table.HeadCell>Student Package</Table.HeadCell> */}
              </Table.Head>
              <Table.Body className=" divide-y">
                {placedStudents &&
                  placedStudents.map((placedStudent) => (
                    <Table.Row
                      key={placedStudent.applicantId}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>{placedStudent.applicantName}</Table.Cell>
                      <Table.Cell>{placedStudent.applicantEmail}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className=" text-center p-2">Recent Applications</h1>
            <Button type="button" gradientDuoTone="purpleToBlue" outline>
              <Link to="/dashboard?tab=applications">View All</Link>
            </Button>
          </div>
          <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Applicant Name</Table.HeadCell>
                <Table.HeadCell>Applicant Email</Table.HeadCell>
                <Table.HeadCell>Job Id</Table.HeadCell>
                <Table.HeadCell>Posted By</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
              </Table.Head>
              <Table.Body className=" divide-y">
                {applications &&
                  applications.map((application) => (
                    <Table.Row
                      key={application._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="w-96">
                        <p className="line-clamp-2">
                          {application.applicantName}
                        </p>
                      </Table.Cell>
                      <Table.Cell className="w-5">
                        {application.applicantEmail}
                      </Table.Cell>
                      <Table.Cell className="w-5">
                        {application.jobId}
                      </Table.Cell>
                      <Table.Cell className="w-5">
                        {application.employerId}
                      </Table.Cell>
                      <Table.Cell className="w-5">
                        <Button
                          size="xs"
                          pill
                          color={`${
                            application.applicationStatus === "hired"
                              ? "green"
                              : "blue"
                          }`}
                        >
                          {application.applicationStatus}
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardComp;
