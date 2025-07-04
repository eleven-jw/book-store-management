// src/components/Breadcrumb.tsx
import React from "react";
import { Breadcrumb } from "antd";
import { useBreadcrumbs } from "./utils/breadcrumbUtils"; // 导入面包屑工具函数

const BreadcrumbComponent: React.FC = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
      <Breadcrumb>
        {breadcrumbs.map((breadcrumb, index) => (
          <Breadcrumb.Item key={index}>
            {breadcrumb.icon && <span>{breadcrumb.icon}</span>}  {/* 如果有 icon，渲染它 */}
            <span>{breadcrumb.title}</span>  {/* 渲染标题 */}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>

    );
};

export default BreadcrumbComponent;