import { useState } from "react";

function TodoForm() {
  //4. lấy ra từ Local storage và render ra giao diện vĩnh viễn
  const [job, setJob] = useState("");
  // const [jobs, setJobs] = useState([])
  //5. khởi tạo các giá trị đã có lúc trước render ra giao diện = strorageJobs
  const [jobs, setJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("jobs2")) ?? [];
  });
  //8. B1 của Edit
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleSubmit = () => {
    //2.5 setJobs(prev1 => [...prev1, job])
    setJobs((prev) => {
      const isJob = [...prev, job];
      //3. Local storage chỉ cho lưu dạng chuỗi
      //3.5 JSOn sang từ mảng sang chuỗi
      const jsonJob = JSON.stringify(isJob);
      // console.log("json", jsonJob);
      localStorage.setItem("jobs2", jsonJob);

      return isJob;
    });
    setJob(""); // 2.sau khi add xong input nhập vào lại trở thành chuỗi rỗng
  };
  // 7 Chức năng xóa
  const handleDelete = (id) => {
    setJobs((prev) => {
      // 7.5 VD khi click vào comment số 3 thì index=3 vậy filter ra những comment khác số 3 ta click thì cho vào mảng lại là newJobs
      const newJobs = prev.filter((cur, index2) => index2 !== id);
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs2", jsonJobs); // jobs2 là chung của localStorage
      return newJobs;
    });
  };
  // 12 B5 Chúc năng chỉnh sữa

  function handleEdit(id) {
    setTodoEditing(id);
    setEditingText(jobs[id]);
  }

  function hanldeSubmitEdit(value, id) {
    setJobs((job) => {
      job[id] = value;
      localStorage.setItem("jobs2", JSON.stringify(job)); // jobs2 là chung của localStorage
      return job;
    });
    setTodoEditing(null);
  }
  return (
    <div style={{ padding: 20 }}>
      <input
        value={job} // 1.truyền value ={job} ban đầu là chuỗi rỗng => setJob = ""
        onChange={(e) => setJob(e.target.value)}
      ></input>

      <button onClick={handleSubmit} className="cursor-pointer">
        Add
      </button>
      <ul className="ul-padding">
        {jobs.map((job1, index) => (
          //6. thêm nút button và hàm handleDelete(index)
          <li key={index}>
            {/* //10. B3 của Edit tạo button  */}
            {todoEditing === index ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
              />
            ) : (
              <div>{job1} </div>
            )}

            <button
              onClick={() => handleDelete(index)}
              className="cursor-pointer"
            >
              <img
                src="https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/256x256/Close_Box_Red.png"
                width="10"
                alt="Delete"
                title="Xóa nè"
              />
            </button>
            {/* nút check Todo */}
            <input type="checkbox"></input>
            {/* //9. B2 của Edit tạo button  */}
            <button onClick={() => handleEdit(index)}>Edit</button>
            {/* //11. B4 Tạo button của Edit để Submit */}
            <button onClick={() => hanldeSubmitEdit(editingText, index)}>
              Submit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoForm;
