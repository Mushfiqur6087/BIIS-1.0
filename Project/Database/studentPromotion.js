const { da } = require("date-fns/locale");
const database = require("./database");
async function updateTeaches() {
  await database.execute(
    `UPDATE TEACHES SET STATUS='Not Graded' WHERE COURSE_ID IN (SELECT DISTINCT(COURSE_ID) FROM ENROLLMENT)`,
    {}
  );
}

async function studentPromotion(ID) {
  //await database.startup();
  const sql = `BEGIN
        GET_PASS_OR_FAIL_STATUS(:id,:msg);
  END;`;

  const binds = {
    // bind variables
    id: ID,
    msg: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 255 },
  };

  const r = await database.execute(sql, binds);

  const result = r.outBinds.msg;
  if (result == "Passed") 
  {


    const sql2 = `SELECT COURSE_ID,GRADE FROM ENROLLMENT WHERE STATUS ='Graded' AND STUDENT_ID =: ID`;
    const binds2 = { ID };
    const course_grade = (await database.execute(sql2, binds2)).rows;
    const sql3 = `SELECT "LEVEL",TERM FROM STUDENT WHERE STUDENT_ID =: ID`;
    const binds3 = { ID };
    const level_term = (await database.execute(sql3, binds3)).rows;
    for (const obj of course_grade) {
      const sql = `INSERT INTO RESULT VALUES(:id,:cid,:g,:l,:t)`;
      const binds = {
        id: ID,
        cid: obj.COURSE_ID,
        g: obj.GRADE,
        l: level_term[0].LEVEL,
        t: level_term[0].TERM,
      };
      await database.execute(sql, binds);
    }
    await database.execute(`DELETE FROM ENROLLMENT WHERE STUDENT_ID =:id`, {
      id: ID,
    });
    const sql = `BEGIN
        GET_NEXT_LEVEL_TERM_PROCEDURE(:l,:t,:msg1,:msg2);
        END;`;

    const binds = {
      // bind variables
      l: level_term[0].LEVEL,
      t: level_term[0].TERM,
      msg1: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 255 },
      msg2: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 255 },
    };

    const r = await database.execute(sql, binds);
    const new_L=(r.outBinds).msg1;
    const new_T=(r.outBinds).msg2;
    const sql1 = `UPDATE STUDENT SET "LEVEL" = :l, TERM = :t WHERE STUDENT_ID = :id`;

    const binds1 ={id : ID,
        l: new_L,
        t: new_T,
    }
    //console.log("before");
    await database.execute(sql1,binds1);

  }

  if (result == "Failed") {
    const sql2 = `SELECT COURSE_ID,GRADE FROM ENROLLMENT WHERE STATUS ='Graded' AND STUDENT_ID =: ID`;
    const binds2 = { ID };
    const course_grade = (await database.execute(sql2, binds2)).rows;
    const sql3 = `SELECT "LEVEL",TERM FROM STUDENT WHERE STUDENT_ID =: ID`;
    const binds3 = { ID };
    const level_term = (await database.execute(sql3, binds3)).rows;
    for (const obj of course_grade) {
        const sql = `INSERT INTO RESULT VALUES(:id,:cid,:g,:l,:t)`;
        const binds = {
          id: ID,
          cid: obj.COURSE_ID,
          g: obj.GRADE,
          l: level_term[0].LEVEL,
          t: level_term[0].TERM,
        };
        await database.execute(sql, binds);
    }

    await database.execute(
      `DELETE FROM ENROLLMENT WHERE STUDENT_ID =:id AND GRADE =:f`,
      { id: ID, f: "F" }
    );
  }

   //await database.shutdown();
}



//studentPromotion(4006);

module.exports = { studentPromotion, updateTeaches };
