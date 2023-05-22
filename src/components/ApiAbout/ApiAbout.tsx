import { CopyBlock, dracula } from "react-code-blocks";
import styles from "./styles/ApiAbout.module.css"
import React from "react";

export default function ApiAbout() {
  const data = [
    {desc: 'API сервер:', code: 'https://www.vm-d69c771b.na4u.ru:3000'},
    {desc: '1. Данный запрос позволяет получить все созданные категории:', code: 'GET /collectionList'},
    {desc: '2. Данный запрос позволяет получить категорию:', code: 'POST /renderTable'},
    {desc: '3. Данный запрос позволяет создать категорию:', code: 'POST /addCollection'},
    {desc: '4. Данный запрос позволяет создать новую запись в переданной категории:', code: 'POST /newRecord'},
  ]

  return (
    <div className={styles.CodeBlockContainer}>
          <h2>API:</h2>
          {
            data.map((el, key) => {
              return (
                <React.Fragment key={key}>
                  <p>{el.desc}</p>
                  <div className={styles.Code}>
                    <CopyBlock
                      text={el.code}
                      language={'text'}
                      showLineNumbers={10}
                      startingLineNumber={1}
                      theme={dracula}
                      wrapLines
                    />
                  </div>
                </React.Fragment>
              )
            })
          }
    </div>
  )
}